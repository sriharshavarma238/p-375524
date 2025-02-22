
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not allowed`);
    }

    // Parse and validate request body
    const { planId, origin } = await req.json();
    console.log('Request received:', { planId, origin });

    if (!planId || !origin) {
      throw new Error('Missing required parameters: planId and origin');
    }

    // Validate plan
    const plans = {
      starter: {
        name: 'Starter Plan',
        price: 9900,
      },
      professional: {
        name: 'Professional Plan',
        price: 19900,
      },
    };

    const plan = plans[planId];
    if (!plan) {
      throw new Error(`Invalid plan: ${planId}`);
    }

    // Create Stripe product
    console.log('Creating Stripe product...');
    const product = await stripe.products.create({
      name: plan.name,
      description: `Monthly subscription for ${plan.name}`,
    });
    console.log('Product created:', product.id);

    // Create Stripe price
    console.log('Creating Stripe price...');
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.price,
      currency: 'usd',
      recurring: {
        interval: 'month',
      },
    });
    console.log('Price created:', price.id);

    // Create checkout session
    console.log('Creating checkout session...');
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      customer_creation: 'always',
    });
    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
