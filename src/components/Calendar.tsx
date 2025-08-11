import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Grid3X3, List, Plus } from 'lucide-react';
import { CalendarEvent, ViewMode } from '@/types/calendar';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import { Button } from '@/components/ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import CalendarGrid from './CalendarGrid';
import CalendarList from './CalendarList';
import EventForm from './EventForm';
import ThemeToggle from './ThemeToggle';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0
  }
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [events, setEvents] = useLocalStorage<CalendarEvent[]>('calendar-events', []);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | undefined>();
  const { success, error, info } = useToast();

  const goToPreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedEvent(undefined);
    setIsEventFormOpen(true);
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setIsEventFormOpen(true);
  };

  const handleSaveEvent = (event: CalendarEvent) => {
    if (selectedEvent) {
      // Update existing event
      setEvents(prev => prev.map(e => e.id === event.id ? event : e));
      success('Event Updated! ✨', `"${event.title}" has been successfully updated.`);
    } else {
      // Add new event
      setEvents(prev => [...prev, event]);
      success('Event Created! 🎉', `"${event.title}" has been added to your calendar.`);
    }
    setIsEventFormOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const eventTitle = selectedEvent.title;
      setEvents(prev => prev.filter(e => e.id !== selectedEvent.id));
      setIsEventFormOpen(false);
      setSelectedEvent(undefined);
      setSelectedDate(undefined);
      info('Event Deleted 🗑️', `"${eventTitle}" has been removed from your calendar.`);
    }
  };

  const handleCloseForm = () => {
    setIsEventFormOpen(false);
    setSelectedEvent(undefined);
    setSelectedDate(undefined);
  };

  return (
    <motion.div
      className="min-h-screen bg-background"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 mb-6 sm:mb-8"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
              <motion.h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Calendar
              </motion.h1>

              <motion.div
                className="text-xs sm:text-sm text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                {events.length} events this month
              </motion.div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle />

              {/* Test Hover Card */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs">
                    Test
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="w-64 p-4 bg-card border border-border shadow-2xl"
                  style={{ zIndex: 9999 }}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">Hover Test</h4>
                    <p className="text-sm text-muted-foreground">
                      If you can see this card, hover functionality is working!
                    </p>
                    <div className="w-full h-2 bg-green-500 rounded"></div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setIsEventFormOpen(true)}
                  className="gap-1 sm:gap-2"
                  size="sm"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">New Event</span>
                  <span className="xs:hidden">New</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex flex-col gap-4 mb-6 sm:mb-8"
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-4">
              <div className="flex items-center gap-1 sm:gap-2">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="secondary" size="sm" onClick={goToPreviousMonth}>
                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </motion.div>

                <motion.h2
                  className="text-lg sm:text-xl lg:text-2xl font-semibold min-w-[140px] sm:min-w-[200px] text-center"
                  key={currentDate.toISOString()}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {format(currentDate, 'MMMM yyyy')}
                </motion.h2>

                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="secondary" size="sm" onClick={goToNextMonth}>
                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="sm" onClick={goToToday} className="text-xs sm:text-sm">
                  Today
                </Button>
              </motion.div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1 mx-auto sm:mx-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "gap-1 sm:gap-2 text-xs sm:text-sm",
                    viewMode === 'grid' && "shadow-sm"
                  )}
                >
                  <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">Grid</span>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "gap-1 sm:gap-2 text-xs sm:text-sm",
                    viewMode === 'list' && "shadow-sm"
                  )}
                >
                  <List className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden xs:inline">List</span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Calendar Content */}
        <motion.div 
          variants={itemVariants}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CalendarGrid
                  currentDate={currentDate}
                  events={events}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <CalendarList
                  currentDate={currentDate}
                  events={events}
                  onEventClick={handleEventClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Event Form Modal */}
        <EventForm
          isOpen={isEventFormOpen}
          onClose={handleCloseForm}
          onSave={handleSaveEvent}
          onDelete={selectedEvent ? handleDeleteEvent : undefined}
          selectedDate={selectedDate}
          event={selectedEvent}
        />
      </div>
    </motion.div>
  );
}