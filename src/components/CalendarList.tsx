import { motion } from 'framer-motion';
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';
import { CalendarEvent } from '@/types/calendar';
import { Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarListProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

const categoryColors = {
  work: 'border-calendar-event bg-calendar-event/10',
  personal: 'border-calendar-event-secondary bg-calendar-event-secondary/10',
  important: 'border-calendar-event-tertiary bg-calendar-event-tertiary/10',
};

export default function CalendarList({ currentDate, events, onEventClick }: CalendarListProps) {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events
      .filter(event => isSameDay(new Date(event.date), date))
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {monthDays.map((date, dayIndex) => {
        const dayEvents = getEventsForDate(date);
        const showDay = dayEvents.length > 0 || isToday(date);

        if (!showDay) return null;

        return (
          <motion.div
            key={date.toISOString()}
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: dayIndex * 0.05 }}
          >
            {/* Date Header */}
            <div className={cn(
              "flex items-center gap-3 pb-2 border-b",
              isToday(date) ? "border-calendar-today" : "border-border"
            )}>
              <Calendar className={cn(
                "h-5 w-5",
                isToday(date) ? "text-calendar-today" : "text-muted-foreground"
              )} />
              <div>
                <h3 className={cn(
                  "font-semibold text-lg",
                  isToday(date) && "text-calendar-today"
                )}>
                  {format(date, 'EEEE, MMMM d')}
                </h3>
                {isToday(date) && (
                  <span className="text-sm text-calendar-today font-medium">Today</span>
                )}
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-2">
              {dayEvents.length === 0 ? (
                <motion.div
                  className="text-muted-foreground text-sm italic py-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  No events scheduled
                </motion.div>
              ) : (
                dayEvents.map((event, eventIndex) => (
                  <motion.div
                    key={event.id}
                    className={cn(
                      "p-4 rounded-lg border-l-4 cursor-pointer transition-all duration-200 hover:shadow-medium",
                      categoryColors[event.category || 'personal'],
                      "hover:scale-[1.02] hover:-translate-y-0.5"
                    )}
                    onClick={() => onEventClick(event)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.3, 
                      delay: eventIndex * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {event.title}
                        </h4>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.startTime} - {event.endTime}</span>
                          </div>
                          
                          <span className="capitalize px-2 py-1 rounded text-xs bg-muted">
                            {event.category || 'personal'}
                          </span>
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-muted-foreground">
                            {event.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        );
      })}

      {monthDays.every(date => getEventsForDate(date).length === 0) && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">
            No events this month
          </h3>
          <p className="text-muted-foreground">
            Click on any date to create your first event
          </p>
        </motion.div>
      )}
    </div>
  );
}