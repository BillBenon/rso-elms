import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Loader from '../../components/Atoms/custom/Loader';
import AddCard from '../../components/Molecules/cards/AddCard';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import intakeProgramStore from '../../store/administration/intake-program.store';
import { CommonCardDataType } from '../../types';
import { IntakeLevelParam } from '../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../utils/getOption';

function SubjectPeriod({ periodId }: { periodId: string }) {
  const { data: subjects, isLoading } = intakeProgramStore.getPeriodSubjects(periodId);
  const [subj, setsubj] = useState<CommonCardDataType[]>();
  const history = useHistory();
  const { intakeId, id, intakeProg, level } = useParams<IntakeLevelParam>();

  useEffect(() => {
    if (subjects?.data.data) {
      let loadedSubjects: CommonCardDataType[] = [];
      subjects.data.data.forEach((subject) => {
        let cardData: CommonCardDataType = {
          id: subject.subject.id,
          code: subject.subject.module.name || `Subject ${subject.subject.title}`,
          description: subject.subject.content,
          title: subject.subject.title,
          status: {
            type: advancedTypeChecker(subject.satus),
            text: subject.satus.toString(),
          },
        };
        loadedSubjects.push(cardData);
      });

      setsubj(loadedSubjects);
    }
  }, [subjects?.data.data]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : subj?.length === 0 ? (
        <NoDataAvailable
          buttonLabel="Add new subject"
          icon="subject"
          title={'No subjects available in this period'}
          handleClick={() =>
            history.push(
              `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-subject/${periodId}`,
            )
          }
          description="There are no subjects assigned to this period, click on the below button to add them!"
        />
      ) : (
        <section className="mt-4 flex flex-wrap justify-start gap-4">
          <AddCard
            title={'Add new subject'}
            onClick={() =>
              history.push(
                `/dashboard/intakes/programs/${intakeId}/${id}/${intakeProg}/levels/${level}/add-subject/${periodId}`,
              )
            }
          />
          {subj?.map((sub) => (
            <div className="p-1 mt-3" key={sub.id}>
              <CommonCardMolecule
                to={{
                  title: 'Subject details',
                  to: `/dashboard/modules/subjects/${sub.id}`,
                }}
                data={sub}
              />
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default SubjectPeriod;
