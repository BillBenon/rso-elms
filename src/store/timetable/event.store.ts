import { useMutation, useQuery } from 'react-query';

import { eventService } from '../../services/timetable/event.service';

class EventStore {
  createEvent() {
    return useMutation(eventService.createEvent);
  }

  getEventById(id: string) {
    return useQuery(['events/id', id], () => eventService.getEvent(id));
  }
  getAllEvents() {
    return useQuery(['events'], eventService.getAllEvents);
  }

  updateEvent() {
    return useMutation(eventService.modifyEvent);
  }
}

export const eventStore = new EventStore();
