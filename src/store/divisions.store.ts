import { useMutation, useQuery } from 'react-query';

import { divisionService } from '../services/administration/divisions.service';

class DivisionStore {
  createDivision() {
    return useMutation(divisionService.addDivision);
  }
  getDivisionByType(id: string) {
    return useQuery(['divisions/id', id], () => divisionService.getDivision(id));
  }
}

export const divisionStore = new DivisionStore();
