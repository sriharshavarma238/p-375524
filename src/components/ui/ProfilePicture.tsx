
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

interface ProfilePictureProps {
  url?: string;
  onUpload: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  url,
  onUpload,
  size = 'md',
  className,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-20 h-20',
    lg: 'w-32 h-32'
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);

      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}${Date.now()}.${fileExt}`;
      const filePath = `profile-pictures/${fileName}`;

      // Simulate progress
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 10;
          if (progress > 90) {
            clearInterval(interval);
            progress = 90;
          }
          setUploadProgress(progress);
        }, 200);
        return interval;
      };
      
      const progressInterval = simulateProgress();

      // Check if bucket exists, and attempt upload
      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onUpload(publicUrl);
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: error.message || "Could not upload your profile picture. Please try again.",
        variant: "destructive"
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000); // Wait for animation to complete
    }
  };

  const containerVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    initial: { 
      scale: 1,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    }
  };

  const overlayVariants = {
    hover: { 
      opacity: 1,
      backdropFilter: "blur(3px)",
    },
    initial: { 
      opacity: 0,
      backdropFilter: "blur(0px)",
    }
  };

  return (
    <motion.div
      className={cn(
        "relative rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-500 p-[2px]",
        sizeClasses[size],
        className
      )}
      initial="initial"
      whileHover="hover"
      variants={containerVariants}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }}
    >
      <motion.div className="w-full h-full rounded-full overflow-hidden relative">
        {url ? (
          <motion.img
            src={url}
            alt="Profile"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ) : (
          <motion.div 
            className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
            animate={{ 
              background: [
                "linear-gradient(45deg, #f3f4f6, #e5e7eb)",
                "linear-gradient(225deg, #f3f4f6, #e5e7eb)",
                "linear-gradient(45deg, #f3f4f6, #e5e7eb)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Camera className="w-1/3 h-1/3 text-gray-400" />
          </motion.div>
        )}

        <AnimatePresence>
          {isHovering && !isUploading && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
              variants={overlayVariants}
              initial="initial"
              animate="hover"
              exit="initial"
              onClick={() => fileInputRef.current?.click()}
              style={{
                background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 100%)`
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Upload className="w-1/4 h-1/4 text-white" />
              </motion.div>
            </motion.div>
          )}

          {isUploading && (
            <motion.div
              className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="w-3/4 h-1 bg-gray-200/30 rounded-full overflow-hidden"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
              >
                <motion.div
                  className="h-full bg-blue-500"
                  style={{ 
                    width: `${uploadProgress}%`,
                    background: "linear-gradient(90deg, #3b82f6, #60a5fa)"
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.p 
                className="text-white text-xs mt-2"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {Math.round(uploadProgress)}%
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleUpload}
        disabled={isUploading}
      />
    </motion.div>
  );
};
