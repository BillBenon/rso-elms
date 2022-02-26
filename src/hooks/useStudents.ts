import { useEffect, useState } from 'react';

import { SelectData } from '../types';
import { classService } from './../services/administration/class.service';

export function useStudents(classId: string): SelectData[] {
  const [students, setstudents] = useState<SelectData[]>([]);

  useEffect(() => {
    classService.getStudentsByClass(classId).then((res) => {
      let studs = res.data.data.map((stud) => {
        return {
          value: stud.student.id,
          label: `${stud.student.user.first_name} ${stud.student.user.last_name}`,
        };
      });

      setstudents(studs);
    });
  }, [classId]);

  return students;
}
