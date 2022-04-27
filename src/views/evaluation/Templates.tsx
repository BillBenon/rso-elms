import React, { Fragment } from 'react';
import toast from 'react-hot-toast';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Button from '../../components/Atoms/custom/Button';
import Loader from '../../components/Atoms/custom/Loader';
import Heading from '../../components/Atoms/Text/Heading';
import ActionableList from '../../components/Molecules/ActionableList';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import NewTemplate from '../../components/Organisms/evaluation/NewTemplate';
import useAuthenticator from '../../hooks/useAuthenticator';
import { queryClient } from '../../plugins/react-query';
import { evaluationStore } from '../../store/evaluation/evaluation.store';

export default function Templates() {
  const { user } = useAuthenticator();

  const history = useHistory();

  const { path } = useRouteMatch();

  const { data: template, isLoading: loadingTemplates } = evaluationStore.getTemplates(
    user?.academy.id + '',
  );

  const { mutate } = evaluationStore.deleteTemplate();

  function deleteTemplate(id: string) {
    mutate(id, {
      onSuccess: () => {
        toast.success('Template deleted successfully');
        queryClient.invalidateQueries(['templates', user?.academy.id]);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  }

  if (loadingTemplates) return <Loader />;

  return (
    <section>
      <Switch>
        <Route
          exact
          path={path}
          render={() => (
            <Fragment>
              <div className="flex justify-end py-8 pl-4">
                <Button
                  onClick={() => {
                    history.push(`${path}/new`);
                  }}>
                  Add template
                </Button>
              </div>

              {template?.data.data.length ? (
                <div>
                  <Heading color="primary" className="bg-main py-4 px-2 w-[28rem]">
                    Evaluation presets
                  </Heading>
                  {template.data.data.map((item) => (
                    <ActionableList
                      key={item.id}
                      handleClick={() => {
                        deleteTemplate(item.id as string);
                      }}>
                      {item.name}
                    </ActionableList>
                  ))}
                </div>
              ) : (
                // <Fragment>
                //   <Table2
                //     data={template?.data.data || []}
                //     hide={['id', 'academy_id']}
                //     actions={actions}
                //     // uniqueColumn={'id'}
                //   />
                //   <PopupMolecule
                //     title="Edit preset"
                //     open={openEdit}
                //     onClose={() => {
                //       setOpenEdit(false);
                //       setCurrentId('');
                //     }}>
                //     <EditTemplate id={currentId} />
                //   </PopupMolecule>
                // </Fragment>
                <NoDataAvailable
                  title={'Not presets found'}
                  description={'Not presets found in this academy'}
                />
              )}
            </Fragment>
          )}
        />

        <Route path={`${path}/new`} exact component={NewTemplate} />
      </Switch>
    </section>
  );
}
