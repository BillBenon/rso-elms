import { UserInfo, UserTypes } from '../types/services/user.types';

export function formatUserTable(data: UserInfo[]): UserTypes[] {
  return data.map((d) => ({
    id: d.id.toString(),
    username: d.username,
    'full name': d.first_name + ' ' + d.last_name,
    email: d.email,
    'ID Card': d.person && d.person.nid,
    academy: d.academy && d.academy.name,
    status: d.generic_status,
    user_type: d.user_type,
  })) as UserTypes[];
}
