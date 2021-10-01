import { useMutation, useQuery } from 'react-query';

import { divisionService } from '../services/administration/divisions.service';

class DivisionStore {
  createDivision() {
    return useMutation(divisionService.addDivision);
  }
  getDivisionByType(type: string) {
    return useQuery(['divisions/id', type], () => divisionService.getDivision(type));
  }

  getDivision(id: string) {
    return useQuery(['divisions/id', id], () => divisionService.getDivisionById(id));
  }

  updateDivision() {
    return useMutation(divisionService.modifyDivision);
  }
}

export const divisionStore = new DivisionStore();
