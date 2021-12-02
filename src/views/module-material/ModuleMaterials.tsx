import React from 'react';
import { Route, Switch, useHistory, useParams, useRouteMatch } from 'react-router';

import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Panel from '../../components/Atoms/custom/Panel';
import Heading from '../../components/Atoms/Text/Heading';
import Accordion from '../../components/Molecules/Accordion';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Tiptap from '../../components/Molecules/editor/Tiptap';
import { authenticatorStore } from '../../store/administration';
import { moduleMaterialStore } from '../../store/administration/module-material.store';
import { ParamType } from '../../types';
import { MaterialType } from '../../types/services/module-material.types';
import { UserType } from '../../types/services/user.types';
import NewModuleMaterial from './NewModuleMaterial';
import NewModuleMaterialAttach from './NewModuleMaterialAttach';
import ShowModuleMaterial from './ShowModuleMaterial';

function ModuleMaterials() {
  const { id } = useParams<ParamType>();
  const history = useHistory();
  const { path, url } = useRouteMatch();
  const { data: moduleMaterial, isLoading } =
    moduleMaterialStore.getModuleMaterialByModule(id);
  const moduleMaterials = moduleMaterial?.data.data || [];
  const authUser = authenticatorStore.authUser().data?.data.data;

  return (
    <Switch>
      <Route
        exact
        path={`${path}`}
        render={() => (
          <div className="flex flex-col gap-4 z-0 pt-6">
            <div className="flex justify-between items-center">
              <Heading fontSize="base" fontWeight="semibold">
                Learning materials ({moduleMaterial?.data.data.length || 0})
              </Heading>
              {authUser?.user_type === UserType.INSTRUCTOR && (
                <Button onClick={() => history.push(`${url}/add-material`)}>
                  <span className="flex items-center">
                    {/* <Icon
                              name="add"
                              size={12}
                              useheightandpadding={false}
                              fill="primary"
                            /> */}
                    <span className="font-semibold">New learning materials</span>
                  </span>
                </Button>
              )}
            </div>
            <>
              {isLoading ? (
                <Loader />
              ) : moduleMaterials.length === 0 ? (
                <NoDataAvailable
                  showButton={authUser?.user_type === UserType.INSTRUCTOR}
                  icon="subject"
                  title={'No learning materials available'}
                  description={
                    'There are no learning materials currently added on this module'
                  }
                  handleClick={() => history.push(`${url}/add-lesson`)}
                />
              ) : (
                <div className="pt-3 w-2/5">
                  <Accordion>
                    {moduleMaterials.map((mat) => {
                      return (
                        <Panel
                          width="w-full"
                          bgColor="main"
                          key={mat.title}
                          title={mat.title}
                          badge={{
                            text: mat.type,
                            type: MaterialType[mat.type],
                          }}>
                          <div className="font-medium text-gray-600 text-sm py-4">
                            <Tiptap
                              editable={false}
                              viewMenu={false}
                              handleChange={() => {}}
                              content={mat.content}
                            />
                          </div>
                          {authUser?.user_type === UserType.INSTRUCTOR && (
                            <Button
                              className="mt-2 mb-4 mx-20"
                              styleType="outline"
                              onClick={() =>
                                history.push(`${url}/add-material/${mat.id}`)
                              }>
                              Add supporting files
                            </Button>
                          )}
                          <ShowModuleMaterial materialId={mat.id + ''} />
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

export default ModuleMaterials;
