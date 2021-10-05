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
}

export default new UserStore();
