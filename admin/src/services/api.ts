export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
}

export const fetchApi = async <T = any>(endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  // Important for sending cookies
  options.credentials = 'include';

  if (!options.headers) {
    options.headers = {};
  }

  if (!(options.body instanceof FormData)) {
    (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }

  return data as T;
};
