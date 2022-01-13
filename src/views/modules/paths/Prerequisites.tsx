import React from 'react';
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router';

import Loader from '../../../components/Atoms/custom/Loader';
import Panel from '../../../components/Atoms/custom/Panel';
import Heading from '../../../components/Atoms/Text/Heading';
import Accordion from '../../../components/Molecules/Accordion';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import Tiptap from '../../../components/Molecules/editor/Tiptap';
import { authenticatorStore } from '../../../store/administration';
import { moduleStore } from '../../../store/administration/modules.store';
import { ParamType } from '../../../types';
import { UserType } from '../../../types/services/user.types';
import NewModuleMaterial from '../../module-material/NewModuleMaterial';
import NewModuleMaterialAttach from '../../module-material/NewModuleMaterialAttach';
import ShowModuleMaterial from '../../module-material/ShowModuleMaterial';

function Prerequisites() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { data: modulePrereqs, isLoading } = moduleStore.getModulePrereqsByModule(id);
  const modulePrerequisites = modulePrereqs?.data.data || [];
  const authUser = authenticatorStore.authUser().data?.data.data;
  const { search } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const showMenu = new URLSearchParams(search).get('showMenus');
  // eslint-disable-next-line no-unused-vars
  const intakeProg = new URLSearchParams(search).get('intkPrg') || '';

  console.log(modulePrereqs);

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <div className="flex flex-col gap-4 z-0 pt-6">
            <div className="flex justify-between items-center">
              <Heading fontSize="base" fontWeight="semibold">
                Module Prerequisites ({modulePrereqs?.data.data.length || 0})
              </Heading>
            </div>
            <>
              {isLoading ? (
                <Loader />
              ) : modulePrerequisites.length === 0 ? (
                <NoDataAvailable
                  showButton={authUser?.user_type === UserType.INSTRUCTOR}
                  icon="subject"
                  title={'No prerequisites are available'}
                  description={
                    'There are no prerequisites currently added on this module'
                  }
                  handleClick={() => history.push(`${url}/add-prereq`)}
                />
              ) : (
                <div className="pt-3 w-2/5">
                  <Accordion>
                    {modulePrerequisites.map((prereq) => {
                      return (
                        <Panel
                          width="w-full"
                          bgColor="main"
                          key={prereq.id}
                          title={prereq.prerequisite.description}
                          //   badge={{
                          //     text: prereq.type,
                          //     type: MaterialType[prereq.type],
                          //   }}
                        >
                          <div className="font-medium text-gray-600 text-sm py-4">
                            <Tiptap
                              editable={false}
                              viewMenu={false}
                              handleChange={() => {}}
                              content={
                                prereq.prerequisite.description + ' ' + prereq.description
                              }
                            />
                          </div>
                          {/* {authUser?.user_type === UserType.INSTRUCTOR && (
                            <Button
                              className="mt-2 mb-4 mx-20"
                              styleType="outline"
                              onClick={() =>
                                history.push(
                                  `${url}/add-material/${prereq.id}?showMenus=${showMenu}&intkPrg=${intakeProg}`,
                                )
                              }>
                              Add supporting files
                            </Button>
                          )} */}
                          <ShowModuleMaterial materialId={prereq.id + ''} />
                        </Panel>
                      );
                    })}
                  </Accordion>
                </div>
              )}
            </>
          </div>
        )}
      />
      {/* show module details */}
      <Route
        exact
        path={`${path}/add-material`}
        render={() => {
          return <NewModuleMaterial />;
        }}
      />
      {/* show module details */}
      <Route
        exact
        path={`${path}/add-material/:materialId`}
        render={() => {
          return <NewModuleMaterialAttach />;
        }}
      />
    </Switch>
  );
}

export default Prerequisites;
