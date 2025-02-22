
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeKey, {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2023-10-16',
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PlanInfo {
  name: string;
  price: number;
}

const PLANS: Record<string, PlanInfo> = {
  starter: {
    name: 'Starter Plan',
    price: 9900, // $99.00
  },
  professional: {
    name: 'Professional Plan',
    price: 19900, // $199.00
  },
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId, origin } = await req.json();
    console.log('Received request with:', { planId, origin });

    // Validate inputs
    if (!planId || !origin) {
      throw new Error('Missing required parameters: planId and origin are required');
    }

    const plan = PLANS[planId];
    if (!plan) {
      throw new Error(`Invalid plan selected: ${planId}`);
    }

    // Ensure origin is a valid URL
    let baseUrl: string;
    try {
      baseUrl = new URL(origin).origin;
    } catch (e) {
      throw new Error('Invalid origin URL provided');
    }

    console.log('Creating product for plan:', plan.name);
    const product = await stripe.products.create({
      name: plan.name,
      description: `Monthly subscription for ${plan.name}`,
    });

    console.log('Creating price for product:', product.id);
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });

    console.log('Creating checkout session with price:', price.id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/pricing`,
      automatic_tax: { enabled: true },
      customer_creation: 'always',
    });

    console.log('Checkout session created successfully:', session.id);

    return new Response(
      JSON.stringify({
        sessionId: session.id,
        url: session.url,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in checkout process:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorResponse = {
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined,
    };

    return new Response(
      JSON.stringify(errorResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});
