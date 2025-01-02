export interface Todo {
    id: number;
    title: string;
    completed: boolean;
  }


  export interface Brand {
    id: number;
    name: string;
    logo: string;
    isActive: boolean;
  }


  export interface Product {
    id: number;
    title: string;
    thumbnail: string;
    isActive: boolean;
  }


  export  interface BrandIDProduct {

    thumbnail: string; 
    title: string;
    description: string;

  }

  export interface LoginCredentials {
    username: string;
    password: string;
  }

  export interface LoginResponse {
    token: string;
  }

  export interface SignupCredentials {
    username: string;
    password: string;
    email: string; // Assuming email is also required for signup
  }
  
  export interface SignupResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
    refresh_token_expires_in: number;
  }