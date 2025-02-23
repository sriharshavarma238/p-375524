
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DemoRequest {
  companyName: string;
  contactName: string;
  email: string;
  companySize: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { companyName, contactName, email, companySize }: DemoRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Demo Request <onboarding@resend.dev>",
      to: [email],
      subject: "Your Demo Request Confirmation",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Demo Request Received</h1>
          <p>Dear ${contactName},</p>
          <p>Thank you for requesting a demo. We're excited to show you how our solution can help ${companyName} achieve its goals.</p>
          <h2 style="color: #444; margin-top: 20px;">Request Details:</h2>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Company:</strong> ${companyName}</li>
            <li><strong>Company Size:</strong> ${companySize}</li>
            <li><strong>Contact Name:</strong> ${contactName}</li>
          </ul>
          <p style="margin-top: 20px;">Our team will contact you within the next 24 hours to schedule your personalized demo.</p>
          <p style="margin-top: 20px;">Best regards,<br>The Team</p>
        </div>
      `,
    });

    console.log("Demo confirmation email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error) {
    console.error("Error sending demo confirmation email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
