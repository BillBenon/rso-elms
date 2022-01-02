import { useMutation, useQuery } from 'react-query';

import { intakeProgramService } from '../../services/administration/IntakeProgram.service';
import { StudentApproval } from '../../types/services/enrollment.types';
import { IntakeModuleStatus } from '../../types/services/intake-program.types';

class IntakeProgramStore {
  getStudentById(studentId: string) {
    return useQuery(['student/id', studentId], () =>
      intakeProgramService.getStudentById(studentId),
    );
  }
  getStudentsByIntakeProgram(intakeProgramId: string) {
    return useQuery(['students/intakeProgramId', intakeProgramId], () =>
      intakeProgramService.getStudentsByIntakeProgram(intakeProgramId),
    );
  }
  getStudentsByIntakeProgramByStatus(intakeProgramId: string, status: StudentApproval) {
    return useQuery(['students/intakeProgramId/status', intakeProgramId, status], () =>
      intakeProgramService.getStudentsByIntakeProgramByStatus(intakeProgramId, status),
    );
  }
  getStudentsByIntakeProgramLevel(intakeProgramlevelId: string) {
    return useQuery(['students/intakeProgramlevelId', intakeProgramlevelId], () =>
      intakeProgramService.getStudentsByIntakeProgramLevel(intakeProgramlevelId),
    );
  }
  getInstructorsByIntakeProgram(intakeProgramId: string) {
    return useQuery(['instructors/intakeprogramId', intakeProgramId], () =>
      intakeProgramService.getInstructorsByIntakeProgram(intakeProgramId),
    );
  }
  getIntakeProgramLevelsByInstructorId(instructorId: string) {
    return useQuery(['instructors/intakeprogram', instructorId], () =>
      intakeProgramService.getIntakeProgramLevelsByInstructorId(instructorId),
    );
  }

  getModulesByInstructorAndStatus(instructorId: string, status: IntakeModuleStatus) {
    return useQuery(['instructor/modules', instructorId], () =>
      intakeProgramService.getModulesByInstructorAndStatus(instructorId, status),
    );
  }

  getStudentsByAcademy(academyId: string) {
    return useQuery(['students/academyId', academyId], () =>
      intakeProgramService.getStudentsByAcademy(academyId),
    );
  }
  getLevelsByIntakeProgram(intakeProgramId: string) {
    return useQuery(['levels/intakeProgramId', intakeProgramId], () =>
      intakeProgramService.getLevelsByIntakeProgram(intakeProgramId),
    );
  }
  getIntakeLevelById(levelId: string) {
    return useQuery(['levels/intake', levelId], () =>
      intakeProgramService.getIntakeLevelById(levelId),
    );
  }

  getPeriodsByLevel(levelId: number) {
    return useQuery(['levels/periods', levelId], () =>
      intakeProgramService.getPeriodsByIntakeAcademicYearLevelId(levelId),
    );
  }
  getModulesByLevel(levelId: number) {
    return useQuery(['levels/modules', levelId], () =>
      intakeProgramService.getModulesByIntakeAcademicYearLevelId(levelId),
    );
  }

  getClassSubjects(classId: string, periodId: string) {
    return useQuery(['subjects/period/class', classId, periodId], () =>
      intakeProgramService.getClassSubjects(classId, periodId),
    );
  }

  addLevelsToIntakeProgram() {
    return useMutation(intakeProgramService.addLevelsToIntakeProgram);
  }
  addLevelToIntakeProgram() {
    return useMutation(intakeProgramService.addLevelToIntakeProgram);
  }
  addPeriodsToLevel() {
    return useMutation(intakeProgramService.addPeriodsToLevel);
  }
  addModuleToLevel() {
    return useMutation(intakeProgramService.addModuleToLevel);
  }
  addSubjectToPeriod() {
    return useMutation(intakeProgramService.addSubjectToPeriod);
  }
}

export function getStudentShipByUserId(userId: string, enabled = false) {
  return useQuery(
    ['studentShip/userId', userId],
    () => intakeProgramService.getStudentShipByUserId(userId),
    { enabled },
  );
}

export function getIntakeProgramsByStudent(studentId: string, enabled = false) {
  return useQuery(
    ['intakeProgram/studentId', studentId],
    () => intakeProgramService.getIntakeProgramsByStudent(studentId),
    { enabled },
  );
}

export function getStudentLevels(studentId: string, enabled = false) {
  return useQuery(
    ['levels/student', studentId],
    () => intakeProgramService.getStudentLevels(studentId),
    { enabled },
  );
}

export default new IntakeProgramStore();
