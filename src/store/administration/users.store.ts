import { useMutation, useQuery } from 'react-query';

import { userService } from '../../services/administration/user.service';

class UserStore {
  createUser() {
    return useMutation(userService.createUser);
  }

  importUsers() {
    return useMutation(userService.importUsers);
  }
  fetchUsers() {
    return useQuery('users', userService.fetchUsers);
  }
  getUsersByInstitution(institutionId: string) {
    return useQuery(['users/institution', institutionId], () =>
      userService.getUsersByInstitution(institutionId),
    );
  }
  getUsersByAcademy(academyId: string) {
    return useQuery(['users/academy', academyId], () =>
      userService.getUsersByAcademy(academyId),
    );
  }
  getUserById(id: string) {
    return useQuery(['user/id', id], () => userService.getUserByid(id));
  }
  getUserAccountsByNid(nid: string) {
    return useQuery(['user/nid', nid], () => userService.getUserAccountByNid(nid));
  }
  getLanguages() {
    return useQuery('languages', userService.getLanguages);
  }
  modifyUser() {
    return useMutation(userService.modifyUser);
  }
  updateUser() {
    return useMutation(userService.updateProfile);
  }
}

export default new UserStore();
