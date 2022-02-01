import { useMutation, useQuery } from 'react-query';

import { eventService } from '../../services/timetable/event.service';

class EventStore {
  createEvent() {
    return useMutation(eventService.createEvent);
  }

  getEventById(id: string) {
    return useQuery(['events/id', id], () => eventService.getEvent(id));
  }

  updateEvent() {
    return useMutation(eventService.modifyEvent);
  }
}

export function getAllEvents(academyId: string, enabled = true) {
  return useQuery(['events'], () => eventService.getAllEvents(academyId), {
    enabled,
  });
}

export const eventStore = new EventStore();
