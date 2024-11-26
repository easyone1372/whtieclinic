import axios from 'axios';

// 스네이크케이스를 카멜케이스로 변환하는 유틸리티 함수
const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = toCamelCase(obj[key]);
        return result;
      },
      {} as Record<string, any>
    );
  }
  return obj;
};

// 카멜케이스를 스네이크케이스로 변환하는 유틸리티 함수
const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => {
        const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
        result[snakeKey] = toSnakeCase(obj[key]);
        return result;
      },
      {} as Record<string, any>
    );
  }
  return obj;
};

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request 인터셉터
api.interceptors.request.use(
  (config) => {
    console.log('Before toSnakeCase:', config.data); // 변환 전 데이터 확인
    if (config.data && typeof config.data === 'object') {
      config.data = toSnakeCase(config.data); // 스네이크 케이스로 변환
    }
    console.log('After toSnakeCase:', config.data); // 변환 후 데이터 확인
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response 인터셉터
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.data); // 응답 데이터 확인
    response.data = toCamelCase(response.data); // 카멜 케이스 변환
    return response;
  },
  (error) => {
    if (error.response?.data) {
      console.error('Validation Error Details:', error.response.data); // 유효성 실패 메시지 출력
    }
    return Promise.reject(error);
  }
);

export default api;
