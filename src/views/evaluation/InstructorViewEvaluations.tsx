import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import BreadCrumb from '../../components/Molecules/BreadCrumb';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import SelectMolecule from '../../components/Molecules/input/SelectMolecule';
import ConfirmationOrganism from '../../components/Organisms/ConfirmationOrganism';
import EvaluationInfoComponent from '../../components/Organisms/forms/evaluation/EvaluationInfoComponent';
import EvaluationQuestionComponent from '../../components/Organisms/forms/evaluation/EvaluationQuestionComponent';
import EvaluationSettings from '../../components/Organisms/forms/evaluation/EvaluationSettings';
import SubjectEvaluationInfoComponent from '../../components/Organisms/forms/evaluation/SubjectEvaluationInfoComponent';
import useAuthenticator from '../../hooks/useAuthenticator';
import { subjectService } from '../../services/administration/subject.service';
import { evaluationService } from '../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
// import instructordeploymentStore from '../../store/instructordeployment.store';
import { CommonCardDataType, Link as LinkList, Privileges } from '../../types';
import { IEvaluationOwnership, ISubjects } from '../../types/services/evaluation.types';
import cookie from '../../utils/cookie';
import { advancedTypeChecker, getDropDownStatusOptions } from '../../utils/getOption';
import EvaluationDetails from './EvaluationDetails';
import EvaluationNotiView from './EvaluationNotiView';
import EvaluationTest from './EvaluationTest';
import StudentReview from './StudentReview';

export default function InstructorViewEvaluations() {
  const [evaluations, setEvaluations] = useState<any>([]);
  const [subjects, setSubjects] = useState<ISubjects[]>([]);
  const [evaluationId, setEvaluationId] = useState('');
  const [ownerShipType, setownerShipType] = useState(IEvaluationOwnership.CREATED_BY_ME);

  const history = useHistory();
  const { path } = useRouteMatch();
  const { user } = useAuthenticator();

  const user_role_cookie = cookie.getCookie('user_role') || '';
  const user_role = user?.user_roles?.find((role) => role.id + '' === user_role_cookie);
  const user_privileges = user_role?.role_privileges?.map((role) => role.name);
  const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

  // const instructorInfo = instructordeploymentStore.getInstructorByUserId(user?.id + '')
  //   .data?.data.data[0];

  const { data: evaluationInfo } =
    evaluationStore.getEvaluationById(evaluationId).data?.data || {};

  const { data, isSuccess, isLoading, isError, refetch } =
    evaluationStore.getEvaluationsByCategory(ownerShipType, user?.id.toString() || '');

  const list: LinkList[] = [
    { to: '/', title: 'home' },
    { to: 'evaluations', title: 'evaluations' },
  ];

  useEffect(() => {
    let formattedEvals: CommonCardDataType[] = [];
    data?.data.data.forEach((evaluation) => {
      let formattedEvaluations = {
        questionaireType: evaluation.questionaire_type,
        settingType: evaluation.setting_type,
        id: evaluation.id,
        title: evaluation.name,
        code: evaluation.evaluation_type.replaceAll('_', ' '),
        description: `${evaluation.total_mark} marks`,
        status: {
          type: advancedTypeChecker(evaluation.evaluation_status),
          text: evaluation.evaluation_status.replaceAll('_', ' '),
        },
      };
      formattedEvals.push(formattedEvaluations);
    });
    setEvaluations(formattedEvals);
  }, [data?.data.data]);

  useEffect(() => {
    refetch();
  }, [ownerShipType, refetch]);

  useEffect(() => {
    async function getSubjects() {
      let filteredSubjects: ISubjects[] = [];

      if (evaluationInfo?.evaluation_module_subjects) {
        const subjectData = await evaluationService.getEvaluationModuleSubjectsByModule(
          evaluationId,
          evaluationInfo?.evaluation_module_subjects[0].intake_program_level_module,
        );

        for (const subj of subjectData.data.data) {
          const subject = await subjectService.getSubject(
            subj.subject_academic_year_period.toString(),
          );
          filteredSubjects.push({
            subject: subject.data.data.title,
            id: subject.data.data.id.toString(),
          });
        }

        setSubjects(filteredSubjects);
      }
    }

    getSubjects();
  }, [evaluationId, evaluationInfo?.evaluation_module_subjects]);

  const handleClick = (id: string) => {
    setEvaluationId(id);

    if (evaluationInfo?.id === id) {
      switch (ownerShipType) {
        case IEvaluationOwnership.FOR_APPROVING:
          history.push(`${path}/details/${id}/approve`);
          break;

        case IEvaluationOwnership.FOR_REVIEWING:
          history.push(`${path}/details/${id}/review`);
          break;

        case IEvaluationOwnership.FOR_MARKING:
          history.push(`${path}/details/${id}/submissions`);
          break;

        case IEvaluationOwnership.FOR_SETTING:
          history.push(
            `${path}/details/${id}/section/${evaluationInfo?.evaluation_module_subjects[0].intake_program_level_module}/${subjects[0].id}`,
          );
          break;

        default:
          history.push(`${path}/details/${id}`);
          break;
      }
    }
  };

  return (
    <div>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <>
              {path === '/dashboard/evaluations' ? (
                <>
                  <section>
                    <BreadCrumb list={list}></BreadCrumb>
                  </section>
                </>
              ) : null}
              <div className="flex flex-col gap-12">
                <Heading fontWeight="semibold" className="pt-7">
                  Evaluations
                </Heading>

                <div className="flex justify-between  w-full">
                  <SelectMolecule
                    width="80"
                    className=""
                    value={ownerShipType}
                    handleChange={(e) =>
                      setownerShipType(e.value as IEvaluationOwnership)
                    }
                    name={'type'}
                    placeholder="Evaluation type"
                    options={getDropDownStatusOptions(IEvaluationOwnership)}
                  />
                  <Button
                    className="self-start"
                    onClick={() => {
                      history.push(`${path}/create`);
                    }}>
                    New evaluation
                  </Button>
                </div>
              </div>

              <section className="flex flex-wrap justify-start gap-4 mt-2">
                {isLoading && evaluations.length === 0 && <Loader />}

                {isSuccess && evaluations.length === 0 ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
                  />
                ) : isSuccess && evaluations.length > 0 ? (
                  evaluations?.map((info: CommonCardDataType, index: number) => (
                    <div key={index}>
                      <CommonCardMolecule
                        className="cursor-pointer"
                        data={info}
                        handleClick={() => handleClick(info.id + '')}>
                        <div>
                          <div className="flex gap-4 pt-4">
                            <Heading fontSize="sm" fontWeight="semibold">
                              Type:{' '}
                            </Heading>

                            <Heading fontSize="sm" color="primary">
                              {
                                //@ts-ignore
                                info.questionaireType
                              }
                            </Heading>
                          </div>
                          <div className="flex gap-4 pt-4">
                            <Heading fontSize="sm" fontWeight="semibold">
                              Setting type:{' '}
                            </Heading>

                            <Heading fontSize="sm" color="primary">
                              {
                                //@ts-ignore
                                (info.settingType || '').replaceAll('_', ' ')
                              }
                            </Heading>
                          </div>
                        </div>
                      </CommonCardMolecule>
                    </div>
                  ))
                ) : isError ? (
                  <NoDataAvailable
                    icon="evaluation"
                    showButton={false}
                    title={'No evaluations available'}
                    description="Consider adding some evaluation to see them here!"
                  />
                ) : null}
              </section>
            </>
          )}
        />
        <Route exact path={`${path}/new`} component={SubjectEvaluationInfoComponent} />

        <Route exact path={`${path}/view/:id`} component={EvaluationNotiView} />
        {hasPrivilege(Privileges.CAN_ANSWER_EVALUATION) && (
          <Route
            exact
            path={`${path}/student-evaluation/:id`}
            component={EvaluationTest}
          />
        )}
        {hasPrivilege(Privileges.CAN_ANSWER_EVALUATION) && (
          <Route
            exact
            path={`${path}/completed/student-evaluation/:id/review`}
            component={StudentReview}
          />
        )}

        {hasPrivilege(Privileges.CAN_CREATE_EVALUATIONS) && (
          <Route path={`${path}/create`} component={EvaluationInfoComponent} />
        )}

        {/**
         * Fix routes
         *
         */}
        {hasPrivilege(Privileges.CAN_CREATE_EVALUATIONS) && (
          <Route
            path={`${path}/:evaluationId/addquestions`}
            component={EvaluationQuestionComponent}
          />
        )}

        {hasPrivilege(Privileges.CAN_CREATE_EVALUATIONS) && (
          <Route path={`${path}/:evaluationId/settings`} component={EvaluationSettings} />
        )}

        {hasPrivilege(Privileges.CAN_ANSWER_EVALUATION) && (
          <Route
            exact
            path={`${path}/attempt/:id`}
            render={() => (
              <ConfirmationOrganism onConfirmationClose={() => history.goBack()} />
            )}
          />
        )}
        <Route path={`${path}/details/:id`} component={EvaluationDetails} />
      </Switch>
    </div>
  );
}
