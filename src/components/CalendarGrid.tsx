import { motion } from 'framer-motion';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isToday, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarDay } from '@/types/calendar';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const categoryColors = {
  work: 'bg-calendar-event',
  personal: 'bg-calendar-event-secondary',
  important: 'bg-calendar-event-tertiary',
};

export default function CalendarGrid({ currentDate, events, onDateClick, onEventClick }: CalendarGridProps) {
  const isMobile = useIsMobile();
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date: Date): CalendarEvent[] => {
    return events.filter(event => isSameDay(new Date(event.date), date));
  };

  const getDayData = (date: Date): CalendarDay => {
    return {
      date,
      isCurrentMonth: isSameMonth(date, currentDate),
      isToday: isToday(date),
      events: getEventsForDate(date),
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Week Header */}
      <div className="grid grid-cols-7 gap-px mb-1 sm:mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 sm:p-3 lg:p-4 text-center text-xs sm:text-sm font-medium text-muted-foreground">
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <motion.div 
        className="calendar-grid"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {calendarDays.map((date, index) => {
          const dayData = getDayData(date);
          const maxEvents = isMobile ? 2 : 3;
          const visibleEvents = dayData.events.slice(0, maxEvents);
          const hasMoreEvents = dayData.events.length > maxEvents;

          return (
            <motion.div
              key={date.toISOString()}
              className={cn(
                "calendar-day cursor-pointer group",
                {
                  "today shadow-glow": dayData.isToday,
                  "other-month": !dayData.isCurrentMonth,
                }
              )}
              onClick={() => onDateClick(date)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.02,
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex flex-col h-full">
                <div className={cn(
                  "text-xs sm:text-sm font-medium mb-1 sm:mb-2",
                  dayData.isToday ? "text-calendar-today-foreground" : "text-foreground"
                )}>
                  {format(date, 'd')}
                </div>

                <div className="space-y-0.5 sm:space-y-1 flex-1">
                  {visibleEvents.map((event, eventIndex) => (
                    <motion.div
                      key={event.id}
                      className={cn(
                        "text-xs p-0.5 sm:p-1 rounded truncate cursor-pointer transition-all duration-200",
                        categoryColors[event.category || 'personal'],
                        "text-white hover:shadow-md"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: eventIndex * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="opacity-80 hidden sm:block">{event.startTime}</div>
                    </motion.div>
                  ))}
                  
                  {hasMoreEvents && (
                    <motion.div
                      className="text-xs text-muted-foreground font-medium cursor-pointer hover:text-foreground transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      +{dayData.events.length - 3} more
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}