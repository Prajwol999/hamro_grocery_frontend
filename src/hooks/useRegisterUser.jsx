

import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

import { registerUserService } from '../services/authServices';


export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUserService, // Using the imported function here
    onSuccess: (data) => {
      toast.success(data.message || 'Signup successful! You can now log in.');
    },
    onError: (error) => {
      toast.error(error.message || 'Signup failed.');
    },
  });
};

