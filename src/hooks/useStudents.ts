import { useEffect, useState } from 'react';

import { classStore } from '../store/administration/class.store';
import { SelectData } from '../types';

export function useStudents(classId: string): SelectData[] {
  const { data: students } = classStore.getStudentsByClass(classId) || [];

  const [studentInfo, setstudentInfo] = useState<SelectData[]>([]);

  useEffect(() => {
    setstudentInfo(
      students?.data.data.map((stud) => {
        return {
          value: stud.student.id,
          label: `${stud.student.user.first_name} ${stud.student.user.last_name}`,
        };
      }) || [],
    );
  }, [students?.data]);

  return studentInfo;
}
