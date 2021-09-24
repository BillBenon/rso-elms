import { useMutation, UseMutationOptions } from 'react-query';

import { authenticatorService } from '../services/authenticator.service';

class AuthenticatorStore {
  login(options?: UseMutationOptions) {
    return useMutation(authenticatorService.login, options);
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
