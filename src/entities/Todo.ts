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