
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  name: string;
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request method
    if (req.method !== "POST") {
      throw new Error(`Method ${req.method} not allowed`);
    }

    // Parse and validate request body
    const { name, email }: VerificationEmailRequest = await req.json();
    
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    console.log("Attempting to send verification email to:", email);

    // Attempt to send email
    const emailResponse = await resend.emails.send({
      from: "Lovable <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your email address",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Welcome to our platform, ${name}!</h1>
          <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
          <p style="margin: 20px 0;">
            <a href="${Deno.env.get("SITE_URL")}/verify?email=${encodeURIComponent(email)}"
               style="background-color: #000; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
              Verify Email Address
            </a>
          </p>
          <p>If you didn't create an account, you can safely ignore this email.</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #666; font-size: 14px;">Best regards,<br>The Team</p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ message: "Verification email sent successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-verification function:", error);
    const errorMessage = error.message || "An unexpected error occurred";
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
