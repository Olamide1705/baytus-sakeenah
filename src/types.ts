export type Role =
  | ""
  | "Community Elder/Alim"
  | "Married Couple (3+ years)"
  | "Newly Married (0-3 years)"
  | "Seeking Marriage"
  | "Parent/Wali"
  | "New Muslim Guidance"
  | "Certified Marriage Coach";
  
export type Gender = "Male" | "Female" | "";

export interface FormData {
  name: string;
  email: string;
  role: Role;
  concerns?: string;
  gender: Gender;
  location: string;
}
