import { useEffect, useState } from 'react';

import instructordeploymentStore from '../store/instructordeployment.store';
import { Instructor } from '../types/services/instructor.types';

export function useGetInstructor(userId: string) {
  const [user, setUser] = useState<Instructor>();

  const userInfo = instructordeploymentStore.getInstructorById(userId).data?.data.data;

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return user;
}
