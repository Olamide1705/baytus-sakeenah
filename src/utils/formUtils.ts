import axios from 'axios';
import { FormData } from '../types';


export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateForm = (formData: FormData): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (!formData.role) {
    errors.role = 'Please select your role';
  }

  if (!formData.gender) {
    errors.gender = 'Please select your gender';
  }

  if (!formData.location) {
    errors.location = 'Please enter your location';
  }

  return errors;
};

const baseUrl = 'https://0181-102-89-83-74.ngrok-free.app'

export const handleFormSubmit = async (formData: FormData): Promise<boolean> => {
  console.log('Form submitted:', formData);

  try {
    const response = await axios.post(`${baseUrl}/api/v1/waitlist/`, formData);

    console.log('API Success Response:', response.data); 

    return response.status >= 200 && response.status < 300;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Error submitting form:', error.message);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }
    return false;
  }
};