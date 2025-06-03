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

