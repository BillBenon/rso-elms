import React from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router-dom'; 
import TabNavigation from '../../components/Molecules/tabs/TabNavigation';
import Permission from '../../components/Atoms/auth/Permission';
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
import { evaluationService } from '../../services/evaluation/evaluation.service';
import { evaluationStore } from '../../store/evaluation/evaluation.store';
import cookie from '../../utils/cookie';

export default function Assignment(){
    const history = useHistory(); 
    const { user } = useAuthenticator();
   const { url, path } = useRouteMatch();


   const user_role_cookie = cookie.getCookie('user_role') || '';
   const user_role = user?.user_roles?.find((role) => role.id + '' === user_role_cookie);
   const user_privileges = user_role?.role_privileges?.map((role) => role.name);
//    const hasPrivilege = (privilege: Privileges) => user_privileges?.includes(privilege);

// const evaluationId='b1e9d29f-a914-44cf-aff5-d9f3a1193b63';
// const id='fed44bf5-fe13-4f18-9e69-901627045002';
//    const { data, isSuccess, isLoading, isError, refetch } =
//    evaluationStore.getStudentEvaluationByStudentIdAndEvaluationId(evaluationId.toString(),id.toString() || '');

//    console.log("data",data)
 

    const tabs = [
        {
          label: 'Pending assignments',
          href: `${url}/studentAssignments`,
        },
        {
          label: 'Unmarked assignments',
          href: `${url}/published`,
        },
        {
          label: 'marked assignments',
          href: `${url}/marked`,
        }
      ];
    
    return ( 
            <div className="block pr-24 pb-8 w-11/12">
                 <Switch>
                    <Route
                    path={`${path}/studentAssignments`}
                    // render={() => <ReviewEvaluation evaluationId={id} />}
                    /> 
                    <Route path={`${path}/published`} 
                    // render={() => <SectionBasedEvaluation />}
                     />{' '}
                      <TabNavigation tabs={tabs}>
                    <div className="pt-8">
                        <Route exact path={`${path}/marked`} 
                        // render={() => <Unbeguns />}
                         />
                    </div>{' '}
                    
           </TabNavigation>
                </Switch>
              </div>
      
           
           );

}