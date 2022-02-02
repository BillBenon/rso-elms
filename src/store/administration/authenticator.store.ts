import { useMutation, useQuery } from 'react-query';

import { authenticatorService } from '../../services/administration/authenticator.service';

class AuthenticatorStore {
  login() {
    return useMutation(authenticatorService.login);
  }
  logout() {
    return useQuery('logout', authenticatorService.logout, { enabled: false });
  }
  authUser(enabled = true) {
    return useQuery('authUser', authenticatorService.authUser, { enabled });
  }
  passwordChange() {
    return useMutation(authenticatorService.passwordChange);
  }
  forgotPassword() {
    return useMutation(authenticatorService.forgotPassword);
  }
  passwordReset() {
    return useMutation(authenticatorService.passwordReset);
  }
}

export const authenticatorStore = new AuthenticatorStore();

// const {
//     data,
//     error,
//     isError,
//     isIdle,
//     isLoading,
//     isPaused,
//     isSuccess,
//     mutate,
//     mutateAsync,
//     reset,
//     status,
//   }
