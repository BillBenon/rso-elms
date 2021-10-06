import React from 'react';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';

import Avatar from '../../components/Atoms/custom/Avatar';
import Button from '../../components/Atoms/custom/Button';
import Heading from '../../components/Atoms/Text/Heading';
import CardHeadMolecule from '../../components/Molecules/CardHeadMolecule';
import CommonCardMolecule from '../../components/Molecules/cards/CommonCardMolecule';
import NoDataAvailable from '../../components/Molecules/cards/NoDataAvailable';
import Tooltip from '../../components/Molecules/Tooltip';
import programStore from '../../store/program.store';
import { ParamType } from '../../types';
import { advancedTypeChecker } from '../../utils/getOption';
import { IProgramData } from './AcademicPrograms';

export default function ViewProgramsInDepartment() {
  const { id } = useParams<ParamType>();
  const { url } = useRouteMatch();
  const history = useHistory();
  const { data } = programStore.getProgramsByDepartment(id);
  const programInfo = data?.data.data;

  let programData: IProgramData[] = [];
  programInfo?.map((obj) => {
    let { id, code, name, description, generic_status, department, incharge, type } = obj;

    let prog: IProgramData = {
      id: id,
      status: {
        type: advancedTypeChecker(generic_status),
        text: generic_status.toString(),
      },
      code: code,
      title: name,
      subTitle: type.replaceAll('_', ' '),
      description: description,
      department: department,
      incharge: incharge && incharge.username,
    };

    programData.push(prog);
  });
  return (
    <div className="flex flex-wrap justify-between mt-2">
      {programData.length ? (
        programData.map((Common) => (
          <Tooltip
            key={Common.code}
            trigger={
              <div className="p-1 mt-3">
                <CommonCardMolecule
                  data={Common}
                  to={{ title: 'module', to: `programs/${Common.id}` }}
                />
              </div>
            }
            open>
            <div className="w-96">
              <CardHeadMolecule
                title={Common.title}
                code={Common.code}
                status={Common.status}
                description={''}
              />

              {/* first column */}

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <Heading color="txt-secondary" fontSize="sm">
                    {Common.department.division_type}
                  </Heading>
                  <Heading fontSize="sm" fontWeight="semibold">
                    {Common.department.name}
                  </Heading>
                </div>
                <div className="flex flex-col gap-2">
                  <Heading color="txt-secondary" fontSize="sm">
                    Modules
                  </Heading>
                  <Heading fontSize="sm" fontWeight="semibold">
                    30
                  </Heading>
                </div>

                <div className="flex flex-col gap-2">
                  <Heading color="txt-secondary" fontSize="sm">
                    Program Type
                  </Heading>
                  <Heading fontSize="sm" fontWeight="semibold">
                    {Common.subTitle}
                  </Heading>
                </div>
                <div className="flex flex-col gap-2">
                  <Heading color="txt-secondary" fontSize="sm">
                    Instructor in charge
                  </Heading>
                  <div className="flex items-center">
                    <div className="">
                      <Avatar
                        size="24"
                        alt="user1 profile"
                        className=" rounded-full  border-2 border-main transform hover:scale-125"
                        src="https://randomuser.me/api/portraits/men/1.jpg"
                      />
                    </div>
                    <Heading fontSize="sm" fontWeight="semibold">
                      {Common.incharge}
                    </Heading>
                  </div>
                </div>
              </div>

              {/* remarks section */}
              <div className="flex flex-col mt-8 gap-4">
                <Heading fontSize="sm" fontWeight="semibold">
                  Remarks
                </Heading>
                <Heading fontSize="sm" color="txt-secondary">
                  {Common.description}
                </Heading>
              </div>
              <div className="mt-4 space-x-4">
                <Link to={`${url}/${Common.id}/edit`}>
                  <Button>Edit program</Button>
                </Link>
                <Button styleType="outline">Change Status</Button>
              </div>
            </div>
          </Tooltip>
        ))
      ) : (
        <NoDataAvailable
          buttonLabel="Add new program"
          title={'No program available'}
          handleClick={() => history.push(`/dashboard/programs/add`)}
          description="And the web just isnt the same without you. Lets get you back online!"
        />
      )}
    </div>
  );
}
