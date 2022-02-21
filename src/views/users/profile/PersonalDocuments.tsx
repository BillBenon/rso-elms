import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Button from '../../../components/Atoms/custom/Button';
import NoDataAvailable from '../../../components/Molecules/cards/NoDataAvailable';
import PopupMolecule from '../../../components/Molecules/Popup';
import Table from '../../../components/Molecules/table/Table';
import NewPersonalDocument from '../../../components/Organisms/forms/user/NewPersonalDocument';
import usersStore from '../../../store/administration/users.store';
import { IEvaluationInfo } from '../../../types/services/evaluation.types';
import { EvaluationStudent } from '../../../types/services/marking.types';
import { UserInfo } from '../../../types/services/user.types';

// interface AttachementsInfo {}

export default function PersonalDocuments({ user }: { user: UserInfo }) {
  const [attachments, setAttachments] = useState([]);
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const { data, isSuccess, isLoading, isError } = usersStore.getPersonalFiles(
    user.person.id + '',
  );
  console.log(data);
  const actions = [
    {
      name: 'Download',
      handleAction: (
        _data?: string | number | EvaluationStudent | IEvaluationInfo | undefined,
      ) => {
        toast('Downloading');
      },
    },
    {
      name: 'Delete',
      handleAction: (
        _data?: string | number | EvaluationStudent | IEvaluationInfo | undefined,
      ) => {
        toast('Deleting');
      },
    },
  ];

  useEffect(() => {
    let formattedSubs: any = [];

    if (isSuccess && data?.data.data) {
      const filteredInfo = data?.data.data.map((attachment: any) =>
        pick(attachment, [
          'id',
          'attachment_id',
          'description',
          'attachment',
          'created_at',
          'updated_at',
        ]),
      );

      filteredInfo?.map((attachment: any) => {
        let filteredData: any = {
          id: attachment.id.toString(),
          'File name': attachment.code,
          'Attachment Description': attachment.description,
          'Date uploaded': attachment.created_at,
        };
        formattedSubs.push(filteredData);
      });

      data?.data && setAttachments(formattedSubs);
    }
  }, [data?.data, isSuccess]);
  return (
    <>
      <div>
        <div className="flex float-right">
          <Link to={`${url}/add-p-doc`}>
            <Button>Upload new file</Button>
          </Link>
        </div>

        {isSuccess && attachments.length === 0 ? (
          <NoDataAvailable
            icon="evaluation"
            buttonLabel="Go back"
            title={'No personal files has been add so far!'}
            handleClick={() => history.goBack}
            description="And the web just isnt the same without you. Lets get you back online!"
          />
        ) : isSuccess && attachments.length > 0 ? (
          <div>
            <Table<any>
              statusColumn="status"
              data={attachments}
              hide={['id']}
              uniqueCol={'id'}
              actions={actions}
            />
          </div>
        ) : isError ? (
          <NoDataAvailable
            icon="evaluation"
            showButton={false}
            title={'Something went wrong'}
            description="Something went wrong, try reloading the page or check your internet connection"
          />
        ) : null}
      </div>
      <Switch>
        {/* add new level popup */}
        <Route
          exact
          path={`${path}/add-p-doc`}
          render={() => {
            return (
              <PopupMolecule title="New Level" open onClose={history.goBack}>
                <NewPersonalDocument personId={user?.person.id + ''} />
              </PopupMolecule>
            );
          }}
        />
      </Switch>
    </>
  );
}
