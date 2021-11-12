import { useMutation, useQuery } from 'react-query';

import { venueService } from '../../services/timetable/venue.service';

class VenueStore {
  createVenue() {
    return useMutation(venueService.createVenue);
  }

  getVenueById(id: string) {
    return useQuery(['venues/id', id], () => venueService.getVenue(id));
  }
  getAllVenues() {
    return useQuery(['venues'], venueService.getAllVenues);
  }

  updateVenue() {
    return useMutation(venueService.modifyVenue);
  }
}

export const venueStore = new VenueStore();
