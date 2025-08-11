import { motion } from 'framer-motion';
import { Clock, Calendar, Tag, MapPin, User, Edit3, Trash2 } from 'lucide-react';
import { CalendarEvent } from '@/types/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface EventPreviewProps {
  event: CalendarEvent;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (event: CalendarEvent) => void;
  showActions?: boolean;
}

const categoryColors = {
  work: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500'
  },
  personal: {
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    text: 'text-purple-700 dark:text-purple-300',
    dot: 'bg-purple-500'
  },
  important: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500'
  }
};

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

export default function EventPreview({ event, onEdit, onDelete, showActions = false }: EventPreviewProps) {
  const categoryStyle = categoryColors[event.category || 'personal'];
  const eventDate = new Date(event.date);

  return (
    <div
      className="event-preview-card relative bg-card border border-border rounded-xl p-4 shadow-2xl"
      style={{
        zIndex: 9999,
        backgroundColor: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))'
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-4"
      >
      {/* Header with title and category */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg text-foreground leading-tight">
            {event.title}
          </h3>
          <motion.div
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
              categoryStyle.bg,
              categoryStyle.border,
              categoryStyle.text,
              "border"
            )}
            whileHover={{ scale: 1.05 }}
          >
            <div className={cn("w-2 h-2 rounded-full", categoryStyle.dot)} />
            {event.category || 'personal'}
          </motion.div>
        </div>

        {/* Gradient divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </motion.div>

      {/* Event details */}
      <motion.div variants={itemVariants} className="space-y-3">
        {/* Date and time */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span className="font-medium">
              {format(eventDate, 'EEEE, MMMM d, yyyy')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
        </div>

        {/* Description */}
        {event.description && (
          <motion.div
            variants={itemVariants}
            className="p-3 rounded-lg bg-muted/30 border border-border/50"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {event.description}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Metadata */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Created: {format(new Date(event.createdAt), 'MMM d, yyyy')}</span>
          {event.updatedAt !== event.createdAt && (
            <span>Updated: {format(new Date(event.updatedAt), 'MMM d, yyyy')}</span>
          )}
        </div>
      </motion.div>

      {/* Actions */}
      {showActions && (onEdit || onDelete) && (
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 pt-2 border-t border-border/50"
        >
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(event)}
              className="flex-1 gap-2 h-8 text-xs"
            >
              <Edit3 className="h-3 w-3" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(event)}
              className="flex-1 gap-2 h-8 text-xs text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          )}
        </motion.div>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className={cn(
        "absolute -inset-1 rounded-xl opacity-10 blur-lg -z-10",
        categoryStyle.dot
      )} />
      </motion.div>
    </div>
  );
}
