export type DateString = string;

export type UserRole =
  | 'user'
  | 'moderator'
  | 'administrator';

export type UserStatus =
  | 'active'
  | 'blocked';

export interface User {
  id_users: number;
  username: string;
  email: string;
  password?: string;
  profile_picture: string | null;
  role: UserRole;
  status: UserStatus;
  registration_date: DateString;
  user_birthday: DateString;
  user_city: string;
  user_province: string;
  user_zipcode: string;
  first_name: string;
  last_name: string;
  phone_number: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  user_birthday: DateString;
  user_city: string;
  user_province: string;
  user_zipcode: string;
  phone_number?: string | null;
}

export interface AuthResponse {
  token: string;
  user: User;
}
