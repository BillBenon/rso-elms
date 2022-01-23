import { Privileges } from '../types/services/privilege.types';

export function isMemberOf(
  privileges: string[] | undefined,
  privelege: Privileges,
): boolean | undefined {
  return privileges?.includes(privelege);
}
