import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Loader from '../../../components/Atoms/custom/Loader';
import Heading from '../../../components/Atoms/Text/Heading';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import InputMolecule from '../../../components/Molecules/input/InputMolecule';
import SelectMolecule from '../../../components/Molecules/input/SelectMolecule';
import TabNavigation from '../../../components/Molecules/tabs/TabNavigation';
import { useClasses } from '../../../hooks/useClasses';
import { classStore } from '../../../store/administration/class.store';
import { markingStore } from '../../../store/administration/marking.store';
import { evaluationStore } from '../../../store/evaluation/evaluation.store';
import { ValueType } from '../../../types';
import { IManualMarking } from '../../../types/services/marking.types';

type PropsType = {
  evaluationId: string;
};

// type StudentMarks = {
//   studentId: string;
//   marks: number;
//   evaluationId: string;
// };

export default function FieldMarking({ evaluationId }: PropsType) {
  const [currentClassId, setCurrentClassId] = useState<string>('');
  const [students, setStudents] = useState<IManualMarking[]>([]);

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { data: studentsData, isLoading } =
    classStore.getStudentsByClass(currentClassId + '') || [];

  const { data: manualMarkingData } = markingStore.getManualMarkingMarks(
    evaluationId,
    currentClassId,
  );

  const [classes, setclasses] = useState(
    evaluationInfo?.intake_level_class_ids.split(','),
  );
  const { mutate } = markingStore.manualMarking();

  function handleClassChange(e: ValueType) {
    setCurrentClassId(e.value.toString());
  }

  function handleMarksChange(e: ValueType, index: number) {
    if (students.length > 0) {
      let studentsClone = [...students];
      let studentMark = studentsClone[index];

      studentMark.marks = parseInt(e.value.toString()) || 0;
      setStudents(studentsClone);
    }
  }

  function handleSubmit() {
    console.log(students);

    mutate(students, {
      onSuccess: () => {
        toast.success('Marked');
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }
  const { url, path } = useRouteMatch();

  const tabs = [
    {
      label: 'Unmarked',
      href: `${url}`,
    },
    {
      label: 'Marked',
      href: `${url}/field/marked`,
    },
  ];

  useEffect(() => {
    setclasses(evaluationInfo?.intake_level_class_ids.split(',') || ['']);
  }, [evaluationInfo?.intake_level_class_ids]);

  useEffect(() => {
    classes && setCurrentClassId(classes[0]);
  }, [classes]);

  useEffect(() => {}, [students]);

  useEffect(() => {
    let newState: IManualMarking[] = [];

    if (manualMarkingData && manualMarkingData?.data.data.length > 0) {
      newState =
        manualMarkingData?.data.data.map((mark) => ({
          student_id: mark.student.admin_id,
          evaluation_id: evaluationInfo?.id || '',
          marks: mark.obtained_mark,
        })) || [];
    } else {
      newState =
        studentsData?.data.data.map((std) => ({
          student_id: std.student.id.toString(),
          evaluation_id: evaluationInfo?.id || '',
          marks: 0,
        })) || [];
    }
    setStudents(newState);
  }, [evaluationInfo?.id, manualMarkingData, studentsData?.data]);
  return (
    <div className="flex flex-col gap-8">
      <Heading fontWeight="semibold" className="pt-7">
        Riding Class
      </Heading>

      <div>
        <Heading fontWeight="medium" fontSize="sm">
          Select class
        </Heading>
        <SelectMolecule
          width="80"
          className=""
          value={currentClassId}
          handleChange={handleClassChange}
          name={'type'}
          placeholder="Evaluation type"
          options={classes?.map((cl) => useClasses(cl)) || []}
        />
      </div>
      <TabNavigation tabs={tabs}>
        <div className="pt-8"></div>
      </TabNavigation>
      <Switch>
        <Route
          exact
          path={`${path}`}
          render={() => (
            <>
              {isLoading && <Loader />}
              {studentsData?.data.data && (
                <div>
                  {studentsData?.data.data.length <= 0 ? (
                    <NoDataAvailable
                      showButton={false}
                      icon="user"
                      buttonLabel="Add new student"
                      title={'No students available'}
                      description="And the web just isnt the same without you. Lets get you back online!"
                    />
                  ) : (
                    <table className="table-auto border-collapse font-medium bg-main w-2/3">
                      <thead>
                        <tr className="text-left text-txt-secondary border-b border-silver">
                          <th className="px-4 py-5 text-sm font-semibold">First name</th>
                          <th className="px-4 py-5 text-sm font-semibold">Last name</th>
                          <th className="px-4 py-5 text-sm font-semibold">Obtained</th>

                          <th className="px-4 py-5 text-sm font-semibold">Out of</th>
                        </tr>
                      </thead>

                      <tbody>
                        {studentsData?.data.data.map((stud, i) => (
                          <tr key={stud.id}>
                            <td className="px-4 py-5 text-sm font-semibold">
                              {stud.student.user.first_name}
                            </td>
                            <td className="px-4 py-5 text-sm font-semibold">
                              {stud.student.user.last_name}
                            </td>
                            <td className="px-4 py-5 text-sm font-semibold">
                              <InputMolecule
                                name="marks"
                                style={{ width: '4rem', height: '2.5rem' }}
                                value={students[i]?.marks}
                                handleChange={(e) => handleMarksChange(e, i)}
                                onBlur={handleSubmit}
                              />
                            </td>
                            <td className="px-4 py-5 text-sm font-semibold">
                              {evaluationInfo?.total_mark}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        />
        <Route exact path={`${path}/field/marked`} render={() => <div>HTML</div>} />
      </Switch>
    </div>
  );
}
