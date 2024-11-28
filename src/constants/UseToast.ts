// utils/toast.ts

import { useToast } from '@/hooks/use-toast';

export const ToastService = () => {
  const { toast } = useToast(); // useToast 훅 사용

  return {
    success: (title: string, description: string) => {
      toast({
        title,
        description,
      });
    },
    error: (title: string, description: string) => {
      toast({
        title,
        description,
        variant: 'destructive',
      });
    },
  };
};
