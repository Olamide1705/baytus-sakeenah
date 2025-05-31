export type Role = 'mentor' | 'couple' | 'single' | '';

export interface FormData {
  name: string;
  email: string;
  role: Role;
  interest?: string;
}