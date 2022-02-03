import React from 'react';

import { statusColors } from '../../../global/global-vars';
import { GenericStatus, Status } from '../../../types';
import { StudentApproval } from '../../../types/services/enrollment.types';
import { IEvaluationStatus } from '../../../types/services/evaluation.types';
import { IntakeStatus } from '../../../types/services/intake.types';
import { IntakeModuleStatus } from '../../../types/services/intake-program.types';
import { advancedTypeChecker } from '../../../utils/getOption';
import Tooltip from '../../Molecules/Tooltip';
import Badge from './Badge';
import Button from './Button';

type RowProps = {
  keys: string[];
  data: Record<string, any>;
  uniqueCol?: any;
  statusColumn?: string;
  anotherStatusColumn?: string;
  statusActions?: {
    name: string;
    type:
      | GenericStatus
      | IntakeStatus
      | IEvaluationStatus
      | IntakeModuleStatus
      | StudentApproval;
    handleStatusAction: (_data?: Record<string, any>[any]) => void;
  }[];
};

const Row = ({
  keys,
  data,
  uniqueCol,
  statusColumn,
  anotherStatusColumn,
  statusActions,
}: RowProps) => {
  return (
    <>
      {keys.map((key) => {
        let val = data[key];
        return (
          <td
            className={`px-4 py-2 ${
              key.toLowerCase() === statusColumn ||
              key.toLowerCase() === anotherStatusColumn
                ? 'text-xs'
                : ''
            }`}
            key={key + Math.random() * 16}>
            {statusActions &&
            (key.toLowerCase() === statusColumn ||
              key.toLowerCase() === anotherStatusColumn) ? (
              <Tooltip
                on="click"
                trigger={
                  key.toLowerCase() === statusColumn ||
                  key.toLowerCase() === anotherStatusColumn ? (
                    <Badge
                      className="cursor-pointer"
                      badgecolor={val && statusColors[val.toLowerCase() as Status]}
                      badgetxtcolor={val && statusColors[val.toLowerCase() as Status]}>
                      {val || '----'}
                    </Badge>
                  ) : (
                    val || '----'
                  )
                }
                open>
                <ul>
                  {statusActions?.map(({ name, type, handleStatusAction }) => (
                    <li className="hover:bg-secondary" key={name}>
                      <Button
                        styleType="text"
                        hoverStyle="no-underline"
                        color="txt-primary"
                        onClick={() => handleStatusAction(uniqueCol && data[uniqueCol])}>
                        <span className={`hover:text-${advancedTypeChecker(type)}-500`}>
                          {name}
                        </span>
                      </Button>
                    </li>
                  ))}
                </ul>
              </Tooltip>
            ) : key.toLowerCase() === statusColumn ||
              key.toLowerCase() === anotherStatusColumn ? (
              <Badge
                badgecolor={val && statusColors[val.toLowerCase() as Status]}
                badgetxtcolor={val && statusColors[val.toLowerCase() as Status]}>
                {val || '----'}
              </Badge>
            ) : (
              val || '----'
            )}
          </td>
        );
      })}
    </>
  );
};

export default Row;
