import { SelectData } from '../types';
import { IntakeStatus } from '../types/services/intake.types';
import { GenericStatus } from './../types/services/common.types';

interface GetDropDownOptionsProps {
  inputs: any[];
  labelName?: string;
  value?: string;
  getOptionLabel?: (_option: Object) => string;
}

export function getDropDownOptions({
  inputs = [],
  labelName = 'name',
  value = 'id',
  getOptionLabel,
}: GetDropDownOptionsProps): SelectData[] {
  let options: SelectData[] = [];
  inputs?.map((input) => {
    options.push({
      label: getOptionLabel ? getOptionLabel(input) : input[labelName],
      value: input[value] as string,
    });
  });

  return options;
}

export function getDropDownStatusOptions(status: any): SelectData[] {
  let selectData: SelectData[] = [];
  if (status) {
    let stats = Object.keys(status).filter((key) => status[key]);
    stats.map((val) => {
      let label = val.toString().replaceAll('_', ' ');
      let input = {
        label: label,
        value: val.toString(),
      };
      selectData.push(input);
    });
  }
  return selectData;
}

export function advancedTypeChecker(
  status: GenericStatus | IntakeStatus,
): 'success' | 'warning' | 'error' {
  let successStatus = ['active', 'completed', 'opened', 'started'];
  let errorStatus = ['inactive', 'closed', 'voided', 'suspended'];

  if (successStatus.includes(status.toString().toLowerCase())) return 'success';
  else if (errorStatus.includes(status.toString().toLowerCase())) return 'error';
  else return 'warning';
}

export const getInchargeDropdown = (users?: any[]): SelectData[] => {
  let options: SelectData[] = [];

  users?.map((user) => {
    options.push({
      label: `${user.first_name} ${user.last_name}`,
      value: user.id.toString(),
    });
  });

  return options;
};
