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
    if (config.data && typeof config.data === 'object') {
      // console.log('원본 데이터:', config.data); // 변환 전
      config.data = toSnakeCase(config.data); // 스네이크 케이스로 변환
      // console.log('변환된 데이터 (snake_case):', config.data); // 변환 후
    }
    return config;
  },
  (error) => {
    // console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response 인터셉터
api.interceptors.response.use(
  (response) => {
    // console.log('원본 응답 데이터:', response.data); // 변환 전
    response.data = toCamelCase(response.data); // 변환
    // console.log('변환된 데이터 (camelCase):', response.data); // 변환 후
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
