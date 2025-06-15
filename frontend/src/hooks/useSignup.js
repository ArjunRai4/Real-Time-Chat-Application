import { useMutation,useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';


const useSignup = () => {
  const queryClient = useQueryClient();

  const {mutate:signupMutation,isPending,error}=useMutation({
    mutationKey:["signup"],
    mutationFn:signup,
    onSuccess:()=>queryClient.invalidateQueries({queryKey:["authUser"]}),
  })

  return {signupMutation,isPending,error};
}

export default useSignup
