
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.4.0?target=deno";

const stripeKey = Deno.env.get('STRIPE_SECRET_KEY');
if (!stripeKey) {
  console.error('STRIPE_SECRET_KEY is not set');
}

const stripe = new Stripe(stripeKey || '', {
  httpClient: Stripe.createFetchHttpClient(),
  apiVersion: '2023-10-16', // Let's specify the API version explicitly
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceInfo {
  name: string;
  priceId: string; // Using Stripe Price IDs instead of raw amounts
}

// Using actual Stripe Price IDs
const PRICE_LOOKUP: Record<string, PriceInfo> = {
  starter: {
    name: 'Starter Plan',
    priceId: 'price_1OpS1mSDyM8kDYjlr1p94q0K', // Replace with your actual Stripe Price ID for the starter plan
  },
  professional: {
    name: 'Professional Plan',
    priceId: 'price_1OpS2KSDyM8kDYjlgKCbKPWa', // Replace with your actual Stripe Price ID for the professional plan
  },
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { planId, origin } = await req.json();
    console.log('Received request for plan:', planId);
    console.log('Origin:', origin);

    const plan = PRICE_LOOKUP[planId];
    if (!plan) {
      throw new Error(`Invalid plan selected: ${planId}`);
    }

    if (!origin) {
      throw new Error('Origin URL is required');
    }

    console.log('Creating checkout session for plan:', plan.name);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
      automatic_tax: { enabled: true },
      customer_creation: 'always',
    });

    console.log('Checkout session created:', session.id);

    return new Response(
      JSON.stringify({ 
        sessionId: session.id, 
        url: session.url,
        planId: planId,
        planName: plan.name
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    // More detailed error response
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorResponse = {
      error: errorMessage,
      details: error instanceof Error ? error.stack : undefined
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
