/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';

import { queryClient } from '../../../../plugins/react-query';
import {
  deliberationStore,
  getLevelsByIntakeProgram,
} from '../../../../store/evaluation/deliberation.store';
import { getEnrollmentByStudentAndLevel } from '../../../../store/evaluation/deliberation.store';
import { ValueType } from '../../../../types';
import { EnrollmentStatus } from '../../../../types/services/enrollment.types';
import {
  PromotionParams,
  PromotionStatus,
  PromotionType,
} from '../../../../types/services/promotion.types';
import { getDropDownOptions } from '../../../../utils/getOption';
import Button from '../../../Atoms/custom/Button';
import RadioMolecule from '../../../Molecules/input/RadioMolecule';
import SelectMolecule from '../../../Molecules/input/SelectMolecule';

interface LevelSelectInfo {
  id: string;
  name: string;
}

export default function UpdateLevel() {
  const { mutateAsync } = deliberationStore.updatePromotion();
  const history = useHistory();
  const [promotion, setPromotion] = useState<PromotionType>({
    id: '',
    promotion_status: PromotionStatus.RETAKE,
    enrolment_status: EnrollmentStatus.COMPLETED,
    final_level: false,
    intake_academic_level_enrolment_id: '',
    next_intake_academic_level_enrolment_id: '',
    position: 0,
  });

  const [nextLevels, setNextLevels] = useState<LevelSelectInfo[]>([]);
  const { reportId, levelId } = useParams<PromotionParams>();

  const { data } = deliberationStore.getReportById(reportId);

  const studentId = data?.data.data.student.admin_id;

  const { data: levelData } = getEnrollmentByStudentAndLevel(
    levelId,
    studentId + '',
    !!studentId,
  );

  const academicProgramId = levelData?.data.data.intake_program_student.intake_program.id;

  const programLevels = getLevelsByIntakeProgram(academicProgramId + '').data?.data.data;

  useEffect(() => {
    data?.data.data && setPromotion({ ...promotion, position: data?.data.data.position });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    console.log(programLevels);
    const levels: LevelSelectInfo[] = [];
    programLevels?.forEach((element) => {
      if (
        levelData &&
        element.id !== levelData?.data.data.academic_year_program_level.id &&
        element.academic_program_level.level.flow >
          levelData?.data.data.academic_year_program_level?.academic_program_level.level
            .flow
      ) {
        levels.push({
          id: element.id + '',
          name: element.academic_program_level.level.name,
        });
      }
    });
    if (levels.length == 0) {
      setPromotion((old) => ({
        ...old,
        final_level: true,
      }));
    } else {
      setPromotion((old) => ({
        ...old,
        final_level: false,
      }));
    }
    setNextLevels(levels);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [programLevels]);

  useEffect(() => {
    setPromotion((old) => ({
      ...old,
      intake_academic_level_enrolment_id: levelData?.data.data.id + '',
    }));
    console.log(levelData?.data.data);
  }, [levelData]);

  function handleChange(e: ValueType) {
    console.log(promotion);

    setPromotion((old) => ({ ...old, [e.name]: e.value }));
  }

  function submitForm<T>(e: FormEvent<T>) {
    e.preventDefault();
    mutateAsync(promotion, {
      onSuccess: () => {
        queryClient.invalidateQueries(['reports/overal/class/period']);
        toast.success('Promotion added successfully');
        history.goBack();
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  return (
    <form onSubmit={submitForm}>
      <RadioMolecule
        defaultValue={promotion.promotion_status}
        className="pb-4"
        value={promotion.promotion_status}
        name="promotion_status"
        options={[
          { label: 'Promoted', value: PromotionStatus.PROMOTED },
          { label: 'Retake', value: PromotionStatus.RETAKE },
        ]}
        handleChange={handleChange}>
        Promotion Status
      </RadioMolecule>
      <SelectMolecule
        width="64"
        name="next_intake_academic_level_enrolment_id"
        placeholder="Select Level"
        value={promotion.next_intake_academic_level_enrolment_id.toString()}
        handleChange={handleChange}
        options={getDropDownOptions({
          inputs: nextLevels,
          labelName: ['name'],
        })}>
        Select Next Level
      </SelectMolecule>{' '}
      <br />
      <Button>Save</Button>
    </form>
  );
}
