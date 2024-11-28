'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import ShaButton from '@/components/atom/Button/ShaButton';
import api from '@/utils/axios';

// 1. Form validation schema
const formSchema = z.object({
  username: z.string().min(2, { message: '아이디는 최소 2자 이상이어야 합니다.' }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
    .regex(/[A-Z]/, { message: '비밀번호는 최소 하나의 대문자를 포함해야 합니다.' })
    .regex(/[0-9]/, { message: '비밀번호는 최소 하나의 숫자를 포함해야 합니다.' })
    .regex(/[@$!%*?&]/, { message: '비밀번호는 최소 하나의 특수문자를 포함해야 합니다.' }),
  // 유효성검사는 다시 만들기
});

// 2. Define a submit handler.
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  try {
    const response = await api.post(`/auth/login/${values}`, {});
    return response.data;
  } catch (error) {
    console.error('에러', error);
  }
  throw {};
};

const LoginF = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  //   field의 구성 요소
  // field 객체는 useForm의 상태 관리 메커니즘과 연결된 특정 입력 필드(username 또는 password)를 다룹니다. 주요 속성은 다음과 같습니다:

  // value: 해당 필드의 현재 값. 예: username의 현재 입력 값.
  // onChange: 값이 변경되었을 때 호출되는 핸들러. 사용자가 입력을 할 때 호출됩니다.
  // onBlur: 해당 필드에서 포커스가 벗어날 때 호출되는 핸들러.
  // name: 필드의 이름. 예: "username" 또는 "password".
  // ref: DOM 요소와 연결을 위한 React ref 객체.

  // field.name: "username" 필드와 연결.
  // field.value: 현재 username 필드의 값 (defaultValues.username 초기값은 '').
  // field.onChange: 사용자가 입력할 때 호출.
  // field.onBlur: 입력 필드에서 포커스가 벗어날 때 호출.

  return (
    <Form {...form}>
      <div className="flex justify-center items-center h-full w-full ">
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-[400px]">
          {/* Username Field */}
          <FormField
            control={form.control}
            name="username"
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

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
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
          <ShaButton type="submit" text="로그인" className="mt-4" />
        </form>
      </div>
    </Form>
  );
};

export default LoginF;
