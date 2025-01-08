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
    product_id: number;
    title: string;
    description: string;
    price: number;
    discount_percentage: number;
    rating: number;
    stock: number;
    brand: {
      id: number;
      name: string;
      description: string;
      logo: string;
      website: string;
      is_active: boolean;
      created_at: string;
    };
    thumbnail: string;
    images: string[];
    is_published: boolean;
    category_id: number;
    brand_id: number;
    gender: string;
    sizes: string[];
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
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      username: string;
      email: string;
      full_name?: string;
    };
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



  export interface CartItem {
    
    product_id: number;
    quantity: number;
   
  }
  
  export interface Cart {
    id: number;
    user_id: number;
    created_at: string;
    total_amount: number;
    cart_items: CartItem[];
  }
  
  export interface CartResponse {
    cart_items: CartItem[]; // Change key to match API expectations
  }


  export interface WishlistRequest {
    product_id: number;
  }
  
 export interface WishlistResponse {
    id: number;
    user_id: number;
    product_id: number;
    created_at: string;
    product: {
      product_id: number;
      title: string;
      description: string;
      price: number;
      discount_percentage: number;
      rating: number;
      stock: number;
      brand: {
        id: number;
        name: string;
        description: string;
        logo: string;
        website: string;
        is_active: boolean;
        created_at: string;
      };
      thumbnail: string;
      images: string[];
      is_published: boolean;
      category_id: number;
      brand_id: number;
      gender: string;
      sizes: string[];
    };
  }
  