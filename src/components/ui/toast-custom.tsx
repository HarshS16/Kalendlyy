import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
  onDismiss: (id: string) => void;
}

const toastVariants = {
  initial: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    rotateY: 45 
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    rotateY: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 300,
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0, 
    x: 300, 
    scale: 0.8,
    rotateY: -45,
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

const iconVariants = {
  initial: { scale: 0, rotate: -180 },
  animate: { 
    scale: 1, 
    rotate: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 400,
      delay: 0.2
    }
  }
};

const progressVariants = {
  initial: { scaleX: 1 },
  animate: (duration: number) => ({
    scaleX: 0,
    transition: {
      duration: duration / 1000,
      ease: "linear"
    }
  })
};

export function CustomToast({ id, type, title, description, duration = 4000, onDismiss }: ToastProps) {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <XCircle className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-emerald-50 dark:bg-emerald-950/50',
          border: 'border-emerald-200 dark:border-emerald-800',
          icon: 'text-emerald-600 dark:text-emerald-400',
          progress: 'bg-emerald-500'
        };
      case 'error':
        return {
          bg: 'bg-red-50 dark:bg-red-950/50',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-600 dark:text-red-400',
          progress: 'bg-red-500'
        };
      case 'warning':
        return {
          bg: 'bg-amber-50 dark:bg-amber-950/50',
          border: 'border-amber-200 dark:border-amber-800',
          icon: 'text-amber-600 dark:text-amber-400',
          progress: 'bg-amber-500'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 dark:bg-blue-950/50',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-600 dark:text-blue-400',
          progress: 'bg-blue-500'
        };
    }
  };

  const colors = getColors();

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn(
        "relative overflow-hidden rounded-xl border backdrop-blur-md shadow-lg max-w-md w-full",
        "bg-card/95 border-border",
        colors.bg,
        colors.border
      )}
      style={{
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Progress bar */}
      <motion.div
        className={cn("absolute top-0 left-0 h-1 origin-left", colors.progress)}
        variants={progressVariants}
        initial="initial"
        animate="animate"
        custom={duration}
      />
      
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      
      <div className="relative p-4">
        <div className="flex items-start gap-3">
          {/* Animated Icon */}
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate="animate"
            className={cn("flex-shrink-0 mt-0.5", colors.icon)}
          >
            {getIcon()}
          </motion.div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <motion.h4 
              className="font-semibold text-foreground text-sm leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h4>
            {description && (
              <motion.p 
                className="text-xs text-muted-foreground mt-1 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {description}
              </motion.p>
            )}
          </div>
          
          {/* Close Button */}
          <motion.button
            onClick={() => onDismiss(id)}
            className="flex-shrink-0 p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </motion.button>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-20 blur-xl -z-10",
        colors.progress
      )} />
    </motion.div>
  );
}
