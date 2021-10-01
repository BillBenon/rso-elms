import { useMutation, useQuery } from 'react-query';

import { userService } from './../services/administration/user.service';
class UserStore {
  createUser() {
    return useMutation(userService.createUser);
  }
  fetchUsers() {
    return useQuery('users', userService.fetchUsers);
  }
}

export default new UserStore();
