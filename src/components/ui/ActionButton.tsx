
import React from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "px-6 py-3 rounded-lg font-medium transition-all duration-200",
        variant === "primary"
          ? "bg-primary text-white hover:bg-primary/90"
          : "bg-transparent text-white border border-white/20 hover:bg-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
