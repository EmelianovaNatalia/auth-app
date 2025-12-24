import { useMutation } from '@tanstack/react-query';
import { loginApi, verify2FAApi } from '../api/auth';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),
    retry: 0,
  });
};

export const useVerify2FAMutation = () => {
  return useMutation({
    mutationFn: (code) => verify2FAApi(code),
    retry: 0,
  });
};
