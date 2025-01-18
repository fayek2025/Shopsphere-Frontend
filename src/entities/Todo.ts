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
  
  export interface WishlistItem {
    id: number; // Unique identifier for the wishlist item
    user_id: number; // ID of the user who owns the wishlist
    product_id: number; // ID of the associated product
    created_at: string; // Timestamp of when the item was added to the wishlist
    product: {
      product_id: number; // Product ID
      title: string; // Product title
      description: string; // Description of the product
      price: number; // Product price
      discount_percentage: number; // Discount on the product
      rating: number; // Rating of the product
      stock: number; // Available stock
      brand: {
        id: number; // Brand ID
        name: string; // Brand name
        description: string; // Brand description
        logo: string; // Logo URL
        website: string; // Website URL
        is_active: boolean; // Whether the brand is active
        created_at: string; // Timestamp when the brand was created
      };
      thumbnail: string; // Thumbnail image URL
      images: string[]; // Array of image URLs
      is_published: boolean; // If the product is published
      category_id: number; // Category ID
      brand_id: number; // Brand ID
      gender: string; // Gender category (if applicable)
      sizes: string[]; // Available sizes
    };
  }
  

  export interface User  {
    id: number;
    username: string;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
    carts: Cart[];
  };


  export interface UserProfileUpdate {
    username: string;
    email: string;
    full_name: string;
  }  

  interface OrderItem {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    subtotal: number;
    product: Product;
  }

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: string;
    shipping_address: string;
    created_at: string;
    order_items: OrderItem[];
  }

  export interface PopularProduct {
    price: number;
    gender: string;
    discount_percentage: number;
    sizes: string[];
    rating: number;
    category_id: number;
    stock: number;
    brand_id: number;
    product_id: number;
    thumbnail: string;
    id: number;
    images: string[];
    title: string;
    is_published: boolean;
    description: string;
    created_at: string;
    likes_count: number;
    average_rating: number | null;
  }