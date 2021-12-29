import { useMutation, useQuery } from 'react-query';

import { userService } from '../../services/administration/user.service';
import { FilterOptions } from '../../types';
import { UserType } from '../../types/services/user.types';

class UserStore {
  createUser() {
    return useMutation(userService.createUser);
  }

  importUsers() {
    return useMutation(userService.importUsers);
  }
  fetchUsers(queryParams?: FilterOptions) {
    return useQuery('users', () => userService.fetchUsers(queryParams));
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

  getUsersByAcademyAndUserType(academyId: string, usertype: UserType) {
    return useQuery(['users/academy', academyId], () =>
      userService.getUsersByAcademyAndUserType(academyId, usertype),
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
