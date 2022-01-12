import { useMutation, useQuery } from 'react-query';

import { userService } from '../../services/administration/user.service';
import { FilterOptions } from '../../types';
import { UserType } from '../../types/services/user.types';
import { formatQueryParameters } from '../../utils/query';

class UserStore {
  createUser() {
    return useMutation(userService.createUser);
  }

  importUsers() {
    return useMutation(userService.importUsers);
  }
  fetchUsers(queryParams?: FilterOptions) {
    return useQuery(['users', formatQueryParameters(queryParams)], () =>
      userService.fetchUsers(queryParams),
    );
  }
  getUsersByInstitution(institutionId: string) {
    return useQuery(['users/institution', institutionId], () =>
      userService.getUsersByInstitution(institutionId),
    );
  }

  getUsersByAcademy(academyId: string, queryParams?: FilterOptions) {
    return useQuery(
      ['users/academy', academyId, formatQueryParameters(queryParams)],
      () => userService.getUsersByAcademy(academyId, queryParams),
    );
  }

  getUsersByAcademyAndUserType(
    academyId: string,
    usertype: UserType,
    queryParams?: FilterOptions,
  ) {
    return useQuery(
      ['users/academy/type', academyId, usertype, formatQueryParameters(queryParams)],
      () => userService.getUsersByAcademyAndUserType(academyId, usertype, queryParams),
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

  addProfile() {
    return useMutation(userService.addProfile);
  }
  downloadProfile(attachmentId: string) {
    return useQuery(['user/profile'], () => userService.downloadProfile(attachmentId));
  }
}

export default new UserStore();
