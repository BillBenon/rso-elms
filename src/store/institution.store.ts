import { useMutation } from 'react-query';

import { institutionService } from '../services/administration/institution.service';

class InstitutionStore {
  create() {
    return useMutation('insitution', institutionService.create);
  }
  getAll() {
    return useMutation('institutions', institutionService.fetchAll);
  }
  getInstitutionById() {
    return useMutation('insitution', institutionService.getInstitutionById);
  }

  updateInstitution() {
    return useMutation(institutionService.update);
  }
}

export const institutionStore = new InstitutionStore();
