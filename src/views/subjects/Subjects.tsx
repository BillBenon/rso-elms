import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

import Permission from '../../components/Atoms/auth/Permission';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import SubjectCard from '../../components/Molecules/cards/modules/SubjectCard';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import useAuthenticator from '../../hooks/useAuthenticator';
import enrollmentStore from '../../store/administration/enrollment.store';
import { subjectStore } from '../../store/administration/subject.store';
import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType, ParamType, Privileges } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';

function Subjects() {
  const [subjects, setSubjects] = useState<CommonCardDataType[]>([]);
  const { id } = useParams<ParamType>();
  const subjectData = subjectStore.getSubjectsByModule(id);
  const { url } = useRouteMatch();
  const { user } = useAuthenticator();
  const { search } = useLocation();
  const history = useHistory();
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';
  const showMenu = new URLSearchParams(search).get('showMenus') || '';
  const instructorInfo =
    instructordeploymentStore.getInstructorByUserId(user?.id + '').data?.data.data || [];

  const instSubjects = enrollmentStore.getSubjectsByInstructor(
    instructorInfo[0]?.id.toString() || '',
  );

  const instructorSubjects = instSubjects.data?.data.data.filter((inst) =>
    subjectData.data?.data.data.map((sub) => sub.id).includes(inst.subject_id),
  );

  useEffect(() => {
    if (subjectData.data?.data) {
      let loadedSubjects: CommonCardDataType[] = [];
      subjectData.data.data.data.forEach((subject) => {
        let cardData: CommonCardDataType = {
          id: subject.id,
          code: subject.module.name || `Subject ${subject.title}`,
          description: subject.content,
          title: subject.title,
          status: {
            type: advancedTypeChecker(subject.generic_status),
            text: subject.generic_status.toString(),
          },
        };
        loadedSubjects.push(cardData);
      });

      setSubjects(loadedSubjects);
    }
  }, [id, subjectData?.data?.data, subjectData?.data?.data.data]);

  return (
    <>
      <Permission privilege={Privileges.CAN_TEACH_MODULE}>
        <Heading className="py-2">Instructor&apos;s Subjects</Heading>
        {instSubjects.isLoading || subjectData.isLoading ? (
          <Loader />
        ) : instructorSubjects?.length === 0 ? (
          <NoDataAvailable
            showButton={false}
            icon="subject"
            title={'No subjects assigned to you'}
            description={
              'You have not been assigned any subjects yet! Please contact the admin for support.'
            }
            handleClick={() => history.push(`${url}/add-subject`)}
          />
        ) : (
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-1 mt-3">
                <SubjectCard subject={subject} intakeProg={intakeProg} />
              </div>
            ))}
          </section>
        )}
      </Permission>
      <Permission privilege={Privileges.CAN_ACCESS_SUBJECTS}>
        <Heading className="py-2">Manage these ubjects</Heading>
        {subjectData.isLoading ? (
          <Loader />
        ) : subjects.length === 0 && subjectData.isSuccess ? (
          <NoDataAvailable
            showButton={false}
            privilege={Privileges.CAN_CREATE_SUBJECTS}
            icon="subject"
            title={'No subjects registered'}
            description={'There are no subjects available yet'}
            handleClick={() => history.push(`${url}/add-subject`)}
          />
        ) : (
          <section className="flex flex-wrap justify-start gap-4 mt-2">
            {subjects.map((subject) => (
              <div key={subject.id} className="p-1 mt-3">
                <SubjectCard
                  subject={subject}
                  showMenu={showMenu}
                  intakeProg={intakeProg}
                />
              </div>
            ))}
          </section>
        )}
      </Permission>
    </>
  );
}

export default Subjects;
