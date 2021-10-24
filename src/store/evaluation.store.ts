import { useMutation, useQuery } from 'react-query';

import { divisionService } from '../services/administration/divisions.service';

class EvaluationStore {
  createEvaluation() {
    return useMutation(divisionService.addDivision);
  }
  getDivisionByType(type: string) {
    return useQuery(['divisions/type', type], () => divisionService.getDivision(type));
  }

  getDivision(id: string) {
    return useQuery(['divisions/id', id], () => divisionService.getDivisionById(id));
  }

  getDepartmentsInFaculty(id: string) {
    return useQuery(['faculties/departments', id], () =>
      divisionService.getFacultyByDepartment(id),
    );
  }

  updateDivision() {
    return useMutation(divisionService.modifyDivision);
  }
}

export const evaluationStore = new EvaluationStore();
