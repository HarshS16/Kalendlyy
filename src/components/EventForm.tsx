// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { CalendarEvent } from '@/types/calendar';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Label } from '@/components/ui/label';
// import { X, Calendar, Clock, Tag } from 'lucide-react';
// import { format } from 'date-fns';

// interface EventFormProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (event: CalendarEvent) => void;
//   onDelete?: () => void;
//   selectedDate?: Date;
//   event?: CalendarEvent;
// }

// export default function EventForm({ isOpen, onClose, onSave, onDelete, selectedDate, event }: EventFormProps) {
//   const [formData, setFormData] = useState({
//     title: '',
//     date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
//     startTime: '09:00',
//     endTime: '10:00',
//     description: '',
//     category: 'personal' as 'work' | 'personal' | 'important',
//   });

//   useEffect(() => {
//     if (event) {
//       setFormData({
//         title: event.title,
//         date: event.date,
//         startTime: event.startTime,
//         endTime: event.endTime,
//         description: event.description || '',
//         category: event.category || 'personal',
//       });
//     } else if (selectedDate) {
//       setFormData(prev => ({
//         ...prev,
//         date: format(selectedDate, 'yyyy-MM-dd'),
//       }));
//     }
//   }, [event, selectedDate]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.title.trim()) return;

//     const eventData: CalendarEvent = {
//       id: event?.id || crypto.randomUUID(),
//       title: formData.title.trim(),
//       date: formData.date,
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//       description: formData.description.trim(),
//       category: formData.category,
//       createdAt: event?.createdAt || new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     onSave(eventData);
//     onClose();
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
          
//           <motion.div
//             className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           >
//             <div className="bg-card border border-border rounded-lg shadow-strong p-6 m-4">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-semibold">
//                   {event ? 'Edit Event' : 'Create Event'}
//                 </h2>
//                 <Button variant="secondary" size="sm" onClick={onClose}>
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="title">Event Title</Label>
//                   <Input
//                     id="title"
//                     value={formData.title}
//                     onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
//                     placeholder="Enter event title"
//                     required
//                     autoFocus
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="date">Date</Label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="date"
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="category">Category</Label>
//                     <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as any }))}>
//                       <SelectTrigger>
//                         <Tag className="h-4 w-4 mr-2" />
//                         <SelectValue />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="work">Work</SelectItem>
//                         <SelectItem value="personal">Personal</SelectItem>
//                         <SelectItem value="important">Important</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="startTime">Start Time</Label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="startTime"
//                         type="time"
//                         value={formData.startTime}
//                         onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="endTime">End Time</Label>
//                     <div className="relative">
//                       <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                       <Input
//                         id="endTime"
//                         type="time"
//                         value={formData.endTime}
//                         onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
//                         className="pl-10"
//                         required
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="description">Description (Optional)</Label>
//                   <Textarea
//                     id="description"
//                     value={formData.description}
//                     onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
//                     placeholder="Add event description..."
//                     rows={3}
//                   />
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <Button type="submit" className="flex-1">
//                     {event ? 'Update Event' : 'Create Event'}
//                   </Button>
                  
//                   {event && onDelete && (
//                     <Button type="button" variant="destructive" onClick={onDelete}>
//                       Delete
//                     </Button>
//                   )}
//                 </div>
//               </form>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }



import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarEvent } from '@/types/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X, Calendar, Clock, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: CalendarEvent) => void;
  onDelete?: () => void;
  selectedDate?: Date;
  event?: CalendarEvent;
}

export default function EventForm({
  isOpen,
  onClose,
  onSave,
  onDelete,
  selectedDate,
  event,
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
    startTime: '09:00',
    endTime: '10:00',
    description: '',
    category: 'personal' as 'work' | 'personal' | 'important',
  });

  useEffect(() => {
    if (!isOpen) return;

    if (event) {
      setFormData({
        title: event.title,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description || '',
        category: event.category || 'personal',
      });
    } else {
      // Reset to default blank values when creating a new event
      setFormData({
        title: '',
        date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : '',
        startTime: '09:00',
        endTime: '10:00',
        description: '',
        category: 'personal',
      });
    }
  }, [event, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const eventData: CalendarEvent = {
      id: event?.id || crypto.randomUUID(),
      title: formData.title.trim(),
      date: formData.date,
      startTime: formData.startTime,
      endTime: formData.endTime,
      description: formData.description.trim(),
      category: formData.category,
      createdAt: event?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onSave(eventData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="bg-card border border-border rounded-lg shadow-strong p-6 w-full max-w-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {event ? 'Edit Event' : 'Create Event'}
                </h2>
                <Button variant="secondary" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="Enter event title"
                    required
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData(prev => ({ ...prev, date: e.target.value }))
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData(prev => ({ ...prev, category: value as any }))
                      }
                    >
                      <SelectTrigger>
                        <Tag className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground shadow-md border border-border backdrop-blur-0">
                        <SelectItem value="work" className="transition hover:brightness-110 data-[highlighted]:brightness-110">Work</SelectItem>
                        <SelectItem value="personal" className="transition hover:brightness-110 data-[highlighted]:brightness-110">Personal</SelectItem>
                        <SelectItem value="important" className="transition hover:brightness-110 data-[highlighted]:brightness-110">Important</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            startTime: e.target.value,
                          }))
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) =>
                          setFormData(prev => ({
                            ...prev,
                            endTime: e.target.value,
                          }))
                        }
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData(prev => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Add event description..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1">
                    {event ? 'Update Event' : 'Create Event'}
                  </Button>

                  {event && onDelete && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={onDelete}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
