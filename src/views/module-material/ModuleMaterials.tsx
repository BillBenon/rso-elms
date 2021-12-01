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
                Module materials ({moduleMaterial?.data.data.length || 0})
              </Heading>
              {authUser?.user_type === UserType.INSTRUCTOR && (
                <Button
                  styleType="outline"
                  onClick={() => history.push(`${url}/add-material`)}>
                  <span className="flex items-center">
                    {/* <Icon
                              name="add"
                              size={12}
                              useheightandpadding={false}
                              fill="primary"
                            /> */}
                    <span className="font-semibold">New module materials</span>
                  </span>
                </Button>
              )}
            </div>
            <>
              <div className="pt-3 w-2/5">
                {isLoading ? (
                  <Loader />
                ) : moduleMaterials.length === 0 ? (
                  <NoDataAvailable
                    icon="subject"
                    title={'No module materials available'}
                    description={
                      'There are no module materials currently added on this level'
                    }
                    handleClick={() => history.push(`${url}/add-lesson`)}
                  />
                ) : (
                  <>
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
                            <div className="font-medium text-gray-600 text-sm pt-4 pb-6">
                              <Tiptap
                                editable={false}
                                viewMenu={false}
                                handleChange={() => {}}
                                content={mat.content}
                              />
                            </div>
                            <Button
                              className="mt-2 mb-4 mx-20"
                              styleType="outline"
                              onClick={() =>
                                history.push(`${url}/add-material/${mat.id}`)
                              }>
                              Add supporting files
                            </Button>
                          </Panel>
                        );
                      })}
                    </Accordion>
                  </>
                )}
              </div>
            </>
          </div>
        )}
      />
      {/* show module details */}
      <Route
        exact
        path={`${path}/add-material`}
        render={() => {
          return (
            // <PopupMolecule
            //   title="Add Module Materials"
            //   open
            //   onClose={handleClose}
            //   closeOnClickOutSide={false}>
            <NewModuleMaterial />
            // </PopupMolecule>
          );
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
