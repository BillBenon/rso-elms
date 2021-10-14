import { AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { queryClient } from '../plugins/react-query';
import { Response } from '../types';
import { UserInfo } from '../types/services/user.types';
import { userService } from './../services/administration/user.service';
class UserStore {
  createUser() {
    return useMutation(userService.createUser, {
      onSuccess(newData) {
        queryClient.setQueryData(['users'], (old) => {
          const previousData = old as AxiosResponse<Response<UserInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
  fetchUsers() {
    return useQuery('users', userService.fetchUsers);
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
    return useMutation(userService.modifyUser, {
      onSuccess(newData) {
        queryClient.setQueryData(['users'], (old) => {
          const previousData = old as AxiosResponse<Response<UserInfo[]>>;
          previousData.data.data.push(newData.data.data);
          return previousData;
        });
      },
    });
  }
}

export default new UserStore();
