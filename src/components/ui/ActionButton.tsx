
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cyan";
  children: React.ReactNode;
  isDarkBg?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = "primary",
  children,
  className,
  isDarkBg = false,
  ...props
}) => {
  return (
    <motion.button
      className={cn(
        "relative px-6 py-3 border transition-colors duration-200 overflow-hidden group",
        variant === "primary"
          ? "bg-black text-white border-black hover:bg-gray-800"
          : variant === "cyan"
          ? cn(
              "bg-transparent hover:bg-transparent",
              isDarkBg 
                ? "text-[#FEF7CD] border-cyan-500" 
                : "text-cyan-500 border-yellow-500"
            )
          : "bg-transparent text-black border-black hover:bg-gray-100",
        className,
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{ transform: "translateX(-100%)" }}
        animate={{
          transform: ["translateX(-100%)", "translateX(100%)"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      {children}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={false}
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 100%)",
        }}
        whileHover={{
          scale: 1.5,
        }}
        transition={{
          duration: 0.3,
        }}
      />
    </motion.button>
  );
};
