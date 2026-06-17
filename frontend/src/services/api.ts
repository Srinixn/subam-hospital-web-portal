const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

export interface ContactSubmitData {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
}

export interface FeedbackSubmitData {
  patientName: string;
  phone?: string;
  email?: string;
  rating: number;
  comments: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  errors?: { field: string; message: string }[];
  data?: T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred.',
        errors: data.errors,
      };
    }

    return {
      success: true,
      message: data.message,
      data: data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'Network error, please try again.',
    };
  }
}

export const api = {
  submitContact: (data: ContactSubmitData) =>
    request<void>('public/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  submitFeedback: (data: FeedbackSubmitData) =>
    request<void>('public/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
