
import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface ActionButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
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
        "relative px-6 py-3 border transition-all duration-300 overflow-hidden group perspective-1000",
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
        className
      )}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: 5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
      }}
      whileTap={{ 
        scale: 0.98,
        rotateX: 0,
        rotateY: 0
      }}
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
        initial={{ x: "-100%" }}
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: "linear"
        }}
      />
      <motion.span
        className="relative z-10 flex items-center justify-center gap-2"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ opacity: 0, scale: 0.8 }}
        whileHover={{ 
          opacity: 1, 
          scale: 1.5,
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 100%)"
        }}
        transition={{ duration: 0.3 }}
        style={{
          mixBlendMode: "overlay"
        }}
      />
    </motion.button>
  );
};
