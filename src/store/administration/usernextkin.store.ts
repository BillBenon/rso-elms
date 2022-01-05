import { useMutation, useQuery } from 'react-query';

import { userNextKinService } from '../../services/administration/usernextkin.service';

class UserNextKinStore {
  createUserNextKin() {
    return useMutation(userNextKinService.createUserNextKin);
  }
  getHisNextKinById(id: string) {
    return useQuery(['user/id', id], () => userNextKinService.getHisNextById(id));
  }
  getPersonByNid(nid: string) {
    return useQuery(['user/nid', nid], () => userNextKinService.getUserByNid(nid));
  }
}
export default new UserNextKinStore();
