import { useMutation } from 'react-query';

import { authenticatorService } from '../services/authenticator.service';

class AuthenticatorStore {
  login() {
    return useMutation(authenticatorService.login);
  }
}

export default new AuthenticatorStore();

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
