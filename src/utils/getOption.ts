import { SelectData } from '../types';

export function getDropDownOptions(inputs: any): SelectData[] {
  let selectData: SelectData[] = [];

  if (inputs?.length) {
    inputs.map((val: any) => {
      let input = {
        label: val.name,
        value: val.id.toString(),
      };
      selectData.push(input);
    });
  }
  return selectData;
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
