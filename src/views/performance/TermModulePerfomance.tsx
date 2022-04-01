import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import Table from '../../components/Molecules/table/Table';
import { classStore } from '../../store/administration/class.store';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { getModuleTermPerformance } from '../../store/evaluation/school-report.store';
import { SelectData } from '../../types';
import { IPerformanceTable } from '../../types/services/report.types';
import { calculateGrade } from '../../utils/school-report';

interface IParamType {
  levelId: string;
  classId: string;
}

export default function TermModulePerfomance() {
  const [moduleId, setModuleId] = useState<string | undefined>(undefined);
  const { levelId, classId } = useParams<IParamType>();

  //   data from backend
  const { data: classInfo } = classStore.getClassById(classId);
  const periodId = classInfo?.data.data.intake_academic_year_period_id.toString();
  const { data, isLoading } = getModuleTermPerformance(moduleId, periodId);
  const { data: modules, isLoading: modulesLoading } =
    intakeProgramStore.getModulesByLevel(parseInt(levelId));
  // auto select first module
  useEffect(() => {
    if (modules?.data && modules?.data.data?.length > 0 && !moduleId)
      setModuleId(modules.data.data[0].id.toString());
  }, [moduleId, modules]);

  const formattedData: IPerformanceTable[] = [];

  data?.data.data.map((record) => {
    let total = {
      obtained: 0,
      max: 0,
    };

    let processed: IPerformanceTable = {
      reg_number: record.student.reg_number,
      id: record.student.admin_id,
    };

    record.evaluationAttempts?.forEach((evaluation) => {
      total.max += evaluation.maximum;
      total.obtained += evaluation.obtained;

      processed[`${evaluation.evaluationName} /${evaluation.maximum}`] =
        evaluation.obtained.toString();
    });

    processed[`total /${total.max}`] = total.obtained;
    processed['grade'] = calculateGrade(total.obtained, total.max);
    formattedData.push(processed);
  });

  return (
    <div>
      <SelectMolecule
        loading={modulesLoading}
        value={moduleId}
        handleChange={(e) => setModuleId(e.value.toString())}
        name={'module'}
        options={(modules?.data.data || []).map(
          (m) => ({ label: m.module.name, value: m.module.id.toString() } as SelectData),
        )}>
        Select module
      </SelectMolecule>
      {isLoading ? (
        <Loader />
      ) : formattedData.length === 0 ? (
        <NoDataAvailable
          title={'Nothing to show here'}
          description={'There are no submissions available for this evaluation'}
        />
      ) : (
        <Table data={formattedData} hide={['id']} />
      )}
    </div>
  );
}
