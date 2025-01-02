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
    full_name?: string;
    username: string;
    
    email: string;
    password: string;
     // Assuming email is also required for signup
  }
  
  export interface SignupResponse {
    full_name : string;
    username: string;
    
    email: string;
    password: string;
  }