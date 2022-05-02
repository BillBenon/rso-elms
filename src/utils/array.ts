import { UserInfo, UserTypes } from '../types/services/user.types';

export function formatUserTable(data: UserInfo[]): UserTypes[] {
  return data.map((d) => ({
    id: d.id.toString(),
    rank: d.person.current_rank?.name,
    username: d.username,
    'full name': d.first_name + ' ' + d.last_name,
    email: d.email,
    'ID Card': d.person && d.person.nid,
    academy: d.academy && d.academy.name,
    status: d.generic_status,
    user_type: d.user_type,
  })) as UserTypes[];
}

export function arrayEquals(arr1: any[], arr2: any[]) {
  if (!arr2) return false;

  // compare lengths - can save a lot of time
  if (arr1.length != arr2.length) return false;

  for (var i = 0, l = arr1.length; i < l; i++) {
    // Check if we have nested arrays
    if (arr1[i] instanceof Array && arr2[i] instanceof Array) {
      // recurse into the nested arrays
      if (!arrayEquals(arr1[i], arr2[i])) return false;
    } else if (arr1[i] != arr2[i]) {
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;
    }
  }
  return true;
}
