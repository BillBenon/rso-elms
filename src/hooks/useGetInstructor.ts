import { useEffect, useState } from 'react';

import instructordeploymentStore from '../store/instructordeployment.store';
import { Instructor } from '../types/services/instructor.types';

export function useGetInstructor(userId: string) {
  const [user, setUser] = useState<Instructor>();
  console.log(userId);

  const userInfo = instructordeploymentStore.getInstructorById(userId).data?.data.data;
  console.log(userInfo);

  useEffect(() => {
    setUser(userInfo);
  }, [userInfo]);

  return user;
}
