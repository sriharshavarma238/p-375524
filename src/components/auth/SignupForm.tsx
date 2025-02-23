
import React from 'react';
import { ActionButton } from "@/components/ui/ActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface SignupFormProps {
  email: string;
  password: string;
  name: string;
  company: string;
  isLoading: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onNameChange: (name: string) => void;
  onCompanyChange: (company: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  email,
  password,
  name,
  company,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onCompanyChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="signup-name">Full Name</Label>
          <Input
            id="signup-name"
            required
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>
        <div>
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder="Enter your password (min. 8 characters)"
          />
        </div>
        <div>
          <Label htmlFor="signup-company">Company Name</Label>
          <Input
            id="signup-company"
            required
            value={company}
            onChange={(e) => onCompanyChange(e.target.value)}
            placeholder="Enter your company name"
          />
        </div>
      </div>

      <ActionButton
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Creating account...
          </div>
        ) : (
          'Create Account'
        )}
      </ActionButton>
    </form>
  );
};
