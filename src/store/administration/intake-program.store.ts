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
}

export default new IntakeProgramStore();
