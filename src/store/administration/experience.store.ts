import { useMutation, useQuery } from 'react-query';

import { experienceService } from '../../services/administration/experience.service';

class ExperienceStore {
  create() {
    return useMutation(experienceService.create);
  }
  getAll() {
    return useMutation('experiences', experienceService.fetchAll);
  }
  getExperienceById(id: string) {
    return useQuery(['experience/id', id], () => experienceService.getExperienceById(id));
  }
  getPersonExperiences(personId: string) {
    return useQuery(['experience/id', personId], () =>
      experienceService.findPersonExperiences(personId),
    );
  }
  update() {
    return useMutation(experienceService.update);
  }
}

export const experienceStore = new ExperienceStore();