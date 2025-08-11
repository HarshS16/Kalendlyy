// import { motion } from 'framer-motion';
// import { Sun, Moon, Monitor } from 'lucide-react';
// import { useTheme } from '@/hooks/useTheme';
// import { Button } from '@/components/ui/button';

// export default function ThemeToggle() {
//   const { theme, toggleTheme } = useTheme();

//   const getIcon = () => {
//     switch (theme) {
//       case 'light':
//         return <Sun className="h-4 w-4" />;
//       case 'dark':
//         return <Moon className="h-4 w-4" />;
//       case 'system':
//         return <Monitor className="h-4 w-4" />;
//     }
//   };

//   const getThemeText = () => {
//     switch (theme) {
//       case 'light':
//         return 'Light';
//       case 'dark':
//         return 'Dark';
//       case 'system':
//         return 'System';
//     }
//   };

//   return (
//     <motion.div
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <Button
//         variant="secondary"
//         size="sm"
//         onClick={toggleTheme}
//         className="relative overflow-hidden gap-2 px-4"
//       >
//         <motion.div
//           key={theme}
//           initial={{ rotate: -180, opacity: 0 }}
//           animate={{ rotate: 0, opacity: 1 }}
//           transition={{ duration: 0.3 }}
//         >
//           {getIcon()}
//         </motion.div>
//         <span className="text-sm font-medium">{getThemeText()}</span>
//       </Button>
//     </motion.div>
//   );
// }

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getThemeText = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return '';
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Select value={theme} onValueChange={(val) => setTheme(val)}>
        <SelectTrigger
          className="w-[140px] gap-2 px-4"
          aria-label="Select theme"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {getIcon()}
          </motion.div>
          <SelectValue placeholder="Theme">
            {getThemeText()}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="z-[60] bg-background border border-border shadow-xl backdrop-blur-md">
          <SelectItem value="light" className="focus:bg-accent/50">
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              Light
            </div>
          </SelectItem>
          <SelectItem value="dark" className="focus:bg-accent/50">
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4" />
              Dark
            </div>
          </SelectItem>
          <SelectItem value="system" className="focus:bg-accent/50">
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4" />
              System
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </motion.div>
  );
}
