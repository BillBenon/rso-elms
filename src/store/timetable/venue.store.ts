import { useMutation, useQuery } from 'react-query';

import { venueService } from '../../services/timetable/venue.service';

class VenueStore {
  createVenue() {
    return useMutation(venueService.createVenue);
  }

  getVenueById(id: string) {
    return useQuery(['venues/id', id], () => venueService.getVenue(id));
  }

  updateVenue() {
    return useMutation(venueService.modifyVenue);
  }
}

export function getAllVenues(academyId: string, enabled = true) {
  return useQuery(['venues'], () => venueService.getAllVenues(academyId), {
    enabled,
  });
}

export const venueStore = new VenueStore();
