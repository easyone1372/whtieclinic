'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ShaButton from '@/components/atom/Button/ShaButton';
import api from '@/utils/axios';
import { useRouter } from 'next/navigation';

// 1. Form validation schema
const formSchema = z.object({
  adminId: z.string().min(2, { message: '아이디는 최소 2자 이상이어야 합니다.' }),
  adminPw: z.string().min(2, { message: '비밀번호는 최소 8자 이상이어야 합니다.' }),
});

const LoginF = () => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      adminId: '',
      adminPw: '',
    },
  });
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Axios의 Request 인터셉터에서 `toSnakeCase`가 적용됨
      console.log('전송 데이터:', values);

      const response = await api.post('/auth/login', values);

      console.log('응답 데이터:', response.data);

      if (response.status === 201) {
        const { accessToken, refreshToken } = response.data;
        console.log('로그인 성공:', { accessToken, refreshToken });

        // 토큰 저장 예제 (localStorage 또는 다른 저장소 사용)
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        router.push('/dashboard');
        setSuccessMessage('로그인 성공!');
      }
    } catch (error: any) {
      setErrorMessage(error?.response?.data?.message || '로그인 요청 중 문제가 발생했습니다.');
      console.error('에러:', error.response?.data || error.message);
    }
  };

  return (
    <Form {...form}>
      <div className="flex justify-center items-center h-full w-full">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] space-y-4">
          {/* Admin ID Field */}
          <FormField
            control={form.control}
            name="adminId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>아이디</FormLabel>
                <FormControl>
                  <Input placeholder="아이디를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Admin PW Field */}
          <FormField
            control={form.control}
            name="adminPw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="비밀번호를 입력하세요" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 에러 메시지 */}
          {errorMessage && (
            <div className="text-red-500 text-sm">{'아이디나 비밀번호가 일치하지 않습니다'}</div>
          )}

          {/* 성공 메시지 */}
          {/* {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>} */}

          <ShaButton type="submit" text="로그인" className="mt-4" />
        </form>
      </div>
    </Form>
  );
};

export default LoginF;
