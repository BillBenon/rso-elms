import { useEffect, useState } from 'react';

import { RoleResWithPrevilages } from '../types';
import cookie from '../utils/cookie';
import useAuthenticator from './useAuthenticator';

export default function usePickedRole() {
  const { user } = useAuthenticator();
  const [picked_role_cookie] = useState(cookie.getCookie('user_role') || '');
  const [picked_role, setPickedRole] = useState<RoleResWithPrevilages | undefined>();

  useEffect(() => {
    setPickedRole(user?.user_roles?.find((role) => role.id + '' === picked_role_cookie));
  }, [picked_role_cookie, user?.user_roles]);

  return picked_role;
}
