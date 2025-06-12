import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { loginUserService } from '../services/authServices';
import { useContext } from 'react';
import NavigationContext from '../context/NavigationContext';


export const useLoginUser = () => {
  const { navigate } = useContext(NavigationContext);

  return useMutation({
    mutationFn: loginUserService,
    onSuccess: (data) => {
      toast.success('Login successful!');
      localStorage.setItem('token', data.token);
      setTimeout(() => {
        
        window.location.hash = '#/dashboard'; 
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });
};
