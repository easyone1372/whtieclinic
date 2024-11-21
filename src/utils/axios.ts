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
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      data: config.data,
    });

    // 요청 데이터를 스네이크케이스로 변환
    if (config.data && typeof config.data === 'object') {
      config.data = toSnakeCase(config.data);
    }

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
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });

    // 응답 데이터를 카멜케이스로 변환
    response.data = toCamelCase(response.data);
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export default api;
