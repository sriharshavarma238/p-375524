
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, context = 'general' } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid messages format');
    }

    const systemPrompt = context === 'cybersecurity' 
      ? `You are an expert cybersecurity AI assistant. Your responses should be:
         1. Security-focused and precise
         2. Professional yet accessible
         3. Based on current best practices
         4. Actionable and clear

         Prioritize:
         - Immediate threat mitigation
         - Security best practices
         - Clear, step-by-step guidance
         - Risk assessment
         - Compliance considerations

         Use appropriate emojis for severity:
         🔴 High severity
         🟡 Medium severity
         🟢 Low severity

         Keep responses concise unless detailed explanation is needed.`
      : `You are a helpful and efficient AI assistant. Your responses should be:
         1. Immediate and concise
         2. Professional but friendly
         3. Clear and actionable
         
         Include occasional emojis for engagement.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150,
        presence_penalty: 0.6,
        frequency_penalty: 0.2,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status);
      throw new Error('Failed to get response from AI');
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from AI');
    }

    console.log('Successfully generated response');

    return new Response(JSON.stringify({ response: data.choices[0].message.content }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-with-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'Sorry, I had trouble processing that. Could you rephrase your question? 🤔',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
