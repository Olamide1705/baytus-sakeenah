export type Role = 'mentor' | 'couple' | 'single' | '';
export type Gender = 'Male'|'Female'| '';

export interface FormData {
  name: string;
  email: string;
  role: Role;
  concerns?: string;
  gender: Gender; 
  location: string;
}