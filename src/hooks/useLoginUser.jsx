import { useMutation } from '@tanstack/react-query';
import { loginUserService } from '../services/authServices';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export const useLoginUser = () => {
  const { login } = useContext(AuthContext);

  return useMutation({
    mutationFn: loginUserService,
    mutationKey: ['login-key'],
    onSuccess: (res) => {
      console.log('Login response:', res);

      // Assuming your backend returns { data: user, token: '...' }
      login(res.data, res.token); // Save user & token

      toast.success('Login successful!');
    },
    onError: () => {
      toast.error('Login failed. Please try again.');
    },
  });
};

export default useLoginUser;