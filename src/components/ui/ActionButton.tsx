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
        "px-6 py-3 border transition-colors duration-200",
        variant === "primary"
          ? "bg-black text-white border-black hover:bg-gray-800"
          : "bg-transparent text-black border-black hover:bg-gray-100",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
