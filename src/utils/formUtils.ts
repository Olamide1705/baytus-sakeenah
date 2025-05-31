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

  return errors;
};

export const handleFormSubmit = async (formData: FormData): Promise<boolean> => {
  // In a real implementation, this would submit to a backend API
  // For now, we'll simulate a successful submission
  console.log('Form submitted:', formData);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return true;
};