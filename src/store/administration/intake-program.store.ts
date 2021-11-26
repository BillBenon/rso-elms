import { useMutation, useQuery } from 'react-query';

import { intakeProgramService } from '../../services/administration/IntakeProgram.service';

class IntakeProgramStore {
  getStudentsByIntakeProgram(intakeProgramId: string) {
    return useQuery(['students/intakeProgramId', intakeProgramId], () =>
      intakeProgramService.getStudentsByIntakeProgram(intakeProgramId),
    );
  }
  getStudentsByIntakeProgramLevel(intakeProgramlevelId: string) {
    return useQuery(['students/intakeProgramlevelId', intakeProgramlevelId], () =>
      intakeProgramService.getStudentsByIntakeProgramLevel(intakeProgramlevelId),
    );
  }
  getInstructorsByIntakeProgram(programId: string, intakeId: string) {
    return useQuery(['instructors/programId/intake', programId, intakeId], () =>
      intakeProgramService.getInstructorsByIntakeProgram(programId, intakeId),
    );
  }
  getInstructorsByIntakeProgramLevel(instructorId: string) {
    return useQuery(['instructors/intakeprogram', instructorId], () =>
      intakeProgramService.getInstructorsByIntakeProgramLevel(instructorId),
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
  getStudentLevels(studentId: string) {
    return useQuery(['levels/student', studentId], () =>
      intakeProgramService.getStudentLevels(studentId),
    );
  }

  getStudentShipByUserId(userId: string) {
    return useQuery(['studentShip/userId', userId], () =>
      intakeProgramService.getStudentShipByUserId(userId),
    );
  }

  getIntakeProgramsByStudent(studentId: string) {
    return useQuery(['intakeProgram/studentId', studentId], () =>
      intakeProgramService.getIntakeProgramsByStudent(studentId),
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
  enrollStudentsToLevel() {
    return useMutation(intakeProgramService.enrollStudentsToLevel);
  }
  enrollStudentToProgram() {
    return useMutation(intakeProgramService.enrollStudentToProgram);
  }
  enrollInstructorToProgram() {
    return useMutation(intakeProgramService.enrollInstructorToProgram);
  }
}

export default new IntakeProgramStore();
