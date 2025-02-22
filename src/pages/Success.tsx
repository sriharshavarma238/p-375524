
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ActionButton } from "@/components/ui/ActionButton";

const Success = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      navigate("/");
    }
  }, [sessionId, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>

      <main className="flex-1 pt-24">
        <div className="max-w-[1440px] mx-auto px-4 md:px-16 text-center">
          <div className="mb-8">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Thank you for your subscription. You'll receive a confirmation email shortly.
            </p>
          </div>
          <ActionButton onClick={() => navigate("/")}>
            Return to Dashboard
          </ActionButton>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Success;
