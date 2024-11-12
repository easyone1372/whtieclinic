import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FormData {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: ''
  });
  
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 빈 칸 체크
    if (!formData.username || !formData.password) {
      setError('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 여기에 실제 로그인 로직 구현
      // 임시로 틀린 경우를 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 실제로는 API 응답에 따라 처리해야 합니다
      // 임시로 항상 실패하도록 설정
      setError('아이디 또는 비밀번호가 맞지 않습니다.');
      
    } catch (error) {
      setError('아이디 또는 비밀번호가 맞지 않습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // 입력 시 에러 메시지 초기화
    if (error) setError('');
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">로그인</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="username">아이디</Label>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;