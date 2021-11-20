import { useQuery } from 'react-query';

import { locationService } from '../../services/administration/location.service';

class LocationStore {
  getLocations() {
    return useQuery('locations', locationService.getLocations);
  }
  getLocationsById(id: string) {
    return useQuery(['locations/id', id], () => locationService.getLocationsById(id));
  }
  getLocationsByLevel(levelId: string) {
    return useQuery(['locations/levelid', levelId], () =>
      locationService.getLocationsByLevel(levelId),
    );
  }
  getAllChildreen(parentId: string) {
    return useQuery(['locations/children', parentId], () =>
      locationService.getAllChildreen(parentId),
    );
  }
  findByParent(parentId: string) {
    return useQuery(['locations/parent', parentId], () =>
      locationService.findByParent(parentId),
    );
  }
}

export default new LocationStore();
