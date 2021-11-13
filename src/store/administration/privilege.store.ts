import { useMutation, useQuery } from 'react-query';

import { privilegeService } from '../../services';

class PrivilegeStore {
  modifyPrivilege() {
    return useMutation(privilegeService.modifyPrivilege);
  }
  getPrivileges() {
    return useQuery('privileges', privilegeService.getAllPrivileges);
  }
  getPrivilege(id: string) {
    return useQuery(['privilege/id', id], () => privilegeService.getPrivilege(id));
  }
}

export const privilegeStore = new PrivilegeStore();
