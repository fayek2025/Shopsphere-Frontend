import { CartResponse, Todo } from "../entities/Todo";
import { Brand } from "../entities/Todo"; // Fix the incorrect import
import { Product } from "../entities/Todo";
import { Linking } from "react-native";
import {
  BrandIDProduct,
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
  Cart,
  WishlistRequest,
  WishlistResponse,
  WishlistItem,
  User,
  UserProfileUpdate,
  Order,
  SearchRequest,
  SearchResponse

} from "../entities/Todo";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "../store/auth/useAuthStore";

// Base URL for the API
const BASE_URL = "https://591c-2a09-bac5-49b-1028-00-19c-16e.ngrok-free.app";
const SSL = "http://192.168.0.105:3030"



export const fetchTodos = async (query = ""): Promise<Todo[]> => {
  const allTodos: Todo[] = [];
  let currentPage = 1;
  const pageSize = 10; // Adjust this value according to your API's pagination limit
  let hasMorePages = true;

  try {
    while (currentPage <= 10) {
      const response = await fetch(
        `${BASE_URL}/products?page=${currentPage}&limit=${pageSize}&query=${query}`
      );

     
      if (!response.ok) {
        throw new Error(`Failed to fetch todos: ${response.statusText}`);
      }

      const responseData = await response.json();
      const todos: Todo[] = responseData.data || [];
      console.log(`Fetched page ${currentPage}:`, todos);

      // Accumulate the results
      allTodos.push(...todos);

      // Check if there are more pages (adjust this based on your API response structure)
      hasMorePages = responseData.hasNextPage; // or check for the last page condition
      currentPage++; // Move to the next page
    }

    console.log("Fetched all todos (products):", allTodos);
    return allTodos;

  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};



export const fetchRecommendedProducts = async (): Promise<Product[]> => {
  const url = `${BASE_URL}/feedback/recommendations`;
  const refreshToken = useAuthStore.getState().refreshToken;
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${refreshToken}`,
  };

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch recommended products: ${response.statusText}`);
  }

  const responseData = await response.json();
  const recommendedProducts: Product[] = responseData.data || [];
  console.log('Fetched recommended products:', recommendedProducts);
  return responseData.data.products || [];
};

/**
 * Fetches a single product by ID from the API.
 */
export const fetchProductById = async (
  productID: number
): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productID}`);
    if (!response.ok) {
      console.log("response", response);
      throw new Error(`Failed to fetch product by ID: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Extract the `data` field containing the product
    const product: Product[] = responseData.data;
    console.log("Fetched product by ID:", product);

    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${productID}:`, error);
    throw error;
  }
};



export const fetchBrandsPopularProduct = async (
  BrandID: number,
  include_popular: boolean = true
): Promise<BrandIDProduct[]> => {
  const allBrandProducts: BrandIDProduct[] = [];
  let currentPage = 1;
  const pageSize = 20; // Adjust this according to the API's pagination limit
  let hasMorePages = true;

  try {
    while (currentPage < 10) {
      // Construct URL using template literals
      const url = `${BASE_URL}/brands/${BrandID}/products?page=${currentPage}&limit=${pageSize}&include_popular=${include_popular}`;

      // Make the request
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products by Brand ID: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      if (!responseData || !Array.isArray(responseData.popular_products)) {
        throw new Error(
          `Unexpected API response format: ${JSON.stringify(responseData)}`
        );
      }

      const brandPopularProducts: BrandIDProduct[] = responseData.popular_products;
      console.log(`Fetched page ${currentPage} products:`, brandPopularProducts);

      // Accumulate the products from the current page
      allBrandProducts.push(...brandPopularProducts);

      // Check if there are more pages
      hasMorePages = responseData.hasNextPage; // Or check other fields like currentPage, totalPages
      
      // Break the loop if there are no more pages
      if (!hasMorePages) {
        break;
      }
      
      currentPage++; // Move to the next page
    }

    console.log("Fetched all products for brand ID:", allBrandProducts);
    return allBrandProducts;

  } catch (error) {
    console.error(`Error fetching products for Brand ID ${BrandID}:`, error);
    throw error;
  }
};


export const fetchBrandsProduct = async (
  BrandID: number,
  include_popular: boolean = true
): Promise<BrandIDProduct[]> => {
  const allBrandProducts: BrandIDProduct[] = [];
  let currentPage = 1;
  const pageSize = 20; // Adjust this according to the API's pagination limit
  let hasMorePages = true;

  try {
    while (currentPage < 10) {
      // Construct URL using template literals
      const url = `${BASE_URL}/brands/${BrandID}/products?page=${currentPage}&limit=${pageSize}&include_popular=${include_popular}`;

      // Make the request
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products by Brand ID: ${response.statusText}`
        );
      }

      const responseData = await response.json();
      if (!responseData || !Array.isArray(responseData.data)) {
        throw new Error(
          `Unexpected API response format: ${JSON.stringify(responseData)}`
        );
      }

      const brandProducts: BrandIDProduct[] = responseData.data;
      console.log(`Fetched page ${currentPage} products:`, brandProducts);

      // Accumulate the products from the current page
      allBrandProducts.push(...brandProducts);

      // Check if there are more pages
      hasMorePages = responseData.hasNextPage; // Or check other fields like currentPage, totalPages
      
      // Break the loop if there are no more pages
      if (!hasMorePages) {
        break;
      }
      
      currentPage++; // Move to the next page
    }

    console.log("Fetched all products for brand ID:", allBrandProducts);
    return allBrandProducts;

  } catch (error) {
    console.error(`Error fetching products for Brand ID ${BrandID}:`, error);
    throw error;
  }
};

// export const fetchBrandsProduct = async (
//   BrandID: number,
//   include_popular: boolean = true
// ): Promise<BrandIDProduct[]> => {
//   const allBrandProducts: BrandIDProduct[] = [];
//   let currentPage = 1;
//   const pageSize = 20; // Adjust this according to the API's pagination limit

//   try {
//     while (true) {
//       const url = `${BASE_URL}/brands/${BrandID}/products?page=${currentPage}&limit=${pageSize}&include_popular=${include_popular}`;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(`Failed to fetch products: ${response.statusText}`);
//       }

//       const responseData = await response.json();
//       const brandProducts: BrandIDProduct[] = responseData.data || [];

//       if (brandProducts.length === 0) {
//         break;
//       }

//       allBrandProducts.push(...brandProducts);

//       if (!responseData.hasNextPage) {
//         break;
//       }

//       currentPage++;
//     }

//     return allBrandProducts;

//   } catch (error) {
//     console.error(`Error fetching products for Brand ID ${BrandID}:`, error);
//     throw error;
//   }
// };


/**
 * Fetches all brands from the API.
 */
export const fetchBrands = async (): Promise<Brand[]> => {
  try {
    const response = await fetch(`${BASE_URL}/brands/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Extract the `data` field containing the brands array
    const brands: Brand[] = responseData.data || [];
    console.log("Fetched brands:", brands);

    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

/**
 * Adds a new product (todo) to the database via the API.
 */
export const addTodo = async (todo: Pick<Todo, "title">): Promise<Todo> => {
  try {
    const response = await fetch(`${BASE_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    if (!response.ok) {
      throw new Error(`Failed to add todo: ${response.statusText}`);
    }

    const newTodo: Todo = await response.json();
    console.log("Added todo (product):", newTodo);

    return newTodo;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

//Authentication

const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  console.log("Attempting login with credentials:", credentials);

  if (!credentials.username || !credentials.password) {
    throw new Error("Both username and password are required.");
  }

  try {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    const response = await axios.post<LoginResponse>(
      `${BASE_URL}/auth/login`,
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("Login response:", response.data);

    // Ensure the user data is included in the response
    const { access_token, refresh_token } = response.data;

    // Ensure user data exists, then call the login method from useAuthStore
    if ( access_token && refresh_token) {
      useAuthStore.getState().login({
        
        accessToken: access_token,
        refreshToken: refresh_token,
      });
    } else {
      throw new Error("User data is missing from login response");
    }

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Server returned error:", error.response?.data);
      throw new Error(error.response?.data?.detail || "Login failed");
    }
    throw error;
  }
};

// Custom hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
    onSuccess: async (data: LoginResponse) => {
      try {
        // Store tokens securely in AsyncStorage
        await AsyncStorage.setItem("access_token", data.access_token);
        await AsyncStorage.setItem("refresh_token", data.refresh_token);

        console.log("Tokens saved successfully");

        // Optionally, invalidate relevant queries
        queryClient.invalidateQueries(["user"]);
      } catch (error) {
        console.error("Failed to store tokens:", error);
      }
    },
    onError: (error: Error) => {
      console.error("Login failed:", error.message);
    },
  });
};

const signupUser = async (
  credentials: SignupCredentials
): Promise<SignupResponse> => {
  console.log("Attempting signup with credentials:", credentials);

  // Validate required fields
  if (!credentials.username || !credentials.password || !credentials.email) {
    throw new Error("Username, password, and email are required.");
  }

  try {
    // Construct the payload as a JSON object
    const payload = {
      username: credentials.username,
      email: credentials.email,
      password: credentials.password,
      full_name: credentials.full_name || "", // Optional field
    };

    console.log("Payload:", JSON.stringify(payload));

    // Send the JSON payload with appropriate headers
    const response = await axios.post<SignupResponse>(
      `${BASE_URL}/auth/signup`,
      payload, // JSON object
      {
        headers: {
          "Content-Type": "application/json", // Correct header for JSON
        },
      }
    );

    console.log("Signup response:", response.data);
    return response.data; // Return the response data
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Server returned error:", error.response?.data);

      // Extract meaningful error message from the response
      const serverError = error.response?.data?.detail;
      const errorMessage = Array.isArray(serverError)
        ? serverError.map((err: any) => err.msg || err).join(", ")
        : serverError || "Signup failed";

      throw new Error(errorMessage);
    }

    throw new Error("An unexpected error occurred.");
  }
};

// Custom hook for signup
export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation<SignupResponse, Error, SignupCredentials>({
    mutationFn: signupUser,
    onSuccess: async (data: SignupResponse) => {
      try {
        // Extract user details from the response
        const { full_name, username, email, id } = data.data;

        // Store user details securely in AsyncStorage
        await AsyncStorage.setItem("user_id", id.toString());
        await AsyncStorage.setItem("full_name", full_name);
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("email", email);

        console.log("User details saved successfully");

        // Optionally, invalidate relevant queries
        queryClient.invalidateQueries(["user"]);
      } catch (error) {
        console.error("Failed to store user details:", error);
      }
    },
    onError: (error: Error) => {
      console.error("Signup failed:", error.message);
    },
  });
};


// Custom hook for signup



//Cart
const createCart = async (cartItems: CartResponse) => {
  const accessToken = useAuthStore.getState().refreshToken;
  console.log(accessToken);

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  const response = await axios.post(`${BASE_URL}/carts/`, cartItems, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    refetchInterval: 6000,
  },
  
    
  

);

  return response.data; // Return the response data
};


// React Query mutation hook for creating a cart
export const useCreateCart = () => {
  return useMutation({
    mutationFn: (cartItems: CartResponse) => createCart(cartItems),
    onSuccess: (data) => {
      console.log('Cart created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating cart:', error);
    },
  });
};

//Get all the cart items
export const fetchCarts = async (query = ""): Promise<Cart[]> => {
  try {
    const token = useAuthStore.getState().refreshToken; // Replace with your actual token or logic to retrieve it
    const response = await fetch(`${BASE_URL}/carts/`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${token}`, // Authorization header
        'Content-Type': 'application/json', // Specify JSON content
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch carts: ${response.statusText}, ${response.status}`);
    }

    const responseData = await response.json();

    // Extract the `data` field containing the carts array
    const carts: Cart[] = responseData.data || [];
    console.log("Fetched carts:", carts);

    return carts;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw error;
  }
};





export const updateCart = async (cartId: number, updatedCartData: CartResponse) => {
  const accessToken = useAuthStore.getState().refreshToken;

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  const response = await axios.put(`${BASE_URL}/carts/${cartId}`, updatedCartData, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data; // Return updated cart data
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartId, updatedCartData }: { cartId: number; updatedCartData: CartResponse }) =>
      updateCart(cartId, updatedCartData),
    onSuccess: (data) => {
      console.log('Cart updated successfully:', data);

      // Invalidate `carts` query to fetch updated cart data
      queryClient.invalidateQueries(['carts']);
    },
    onError: (error) => {
      console.error('Error updating cart:', error);
    },
  });
};

// API Function to Delete a Cart Item
export const deleteCartItem = async (cartId: number) => {
  const accessToken = useAuthStore.getState().refreshToken;

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  const response = await axios.delete(`${BASE_URL}/carts/${cartId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data; // Return the API response (optional)
};

// React Query Hook for Deleting Cart Items
export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartId: number) => deleteCartItem(cartId),
    onSuccess: (data) => {
      console.log('Cart item deleted successfully:', data);

      // Invalidate the `carts` query to refresh the cart list
      queryClient.invalidateQueries(['carts']);
    },
    onError: (error) => {
      console.error('Error deleting cart item:', error);
    },
  });
};


//Wishlist

export const createWishlistItem = async (requestBody: { product_id: number }) => {
  const accessToken = useAuthStore.getState().refreshToken;
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  try {
    const response = await axios.post(`${BASE_URL}/wishlist`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
};

export const useCreateWishlist = () => {
  return useMutation({
    mutationFn: (requestBody: { product_id: number }) => createWishlistItem(requestBody),
    onSuccess: (data) => {
      console.log('Wishlist item created successfully:', data);
    },
    onError: (error) => {
      console.error('Error creating wishlist item:', error);
    },
  });
};  


export const fetchWishlist = async (query = ""): Promise<WishlistItem[]> => {
  try {
    // Construct the full URL with the query if provided
    const refreshToken = useAuthStore.getState().refreshToken;
    const url = `${BASE_URL}/wishlist`;

    // Fetch data from the API
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // Check for non-OK responses
    if (!response.ok) {
      throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();

    // Extract the wishlist array from the `data` field
    const wishlist: WishlistItem[] = responseData.data || [];
    console.log("Fetched wishlist items:", wishlist);

    return wishlist;
  } catch (error) {
    // Log and rethrow errors for higher-level handling
    console.error("Error fetching wishlist:", error);
    throw error;
  }
};


// API Function to Delete a Wishlist Item
export const deleteWishlistItem = async (wishlistId: number) => {
  const accessToken = useAuthStore.getState().refreshToken;

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  const response = await axios.delete(`${BASE_URL}/wishlist/${wishlistId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  return response.data; // Return the API response (optional)
};


export const useDeleteWishlistItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (wishlistId: number) => deleteWishlistItem(wishlistId),
    onSuccess: (data) => {
      console.log('Wishlist item deleted successfully:', data);

      // Invalidate the `wishlist` query to refresh the wishlist
      queryClient.invalidateQueries(['wishlist']);
    },
    onError: (error) => {
      console.error('Error deleting wishlist item:', error);
    },
  });
};

//Payment
export const fetchPaymentGatewayURL = async (): Promise<string> => {
  let response: Response | undefined; // Declare response outside the try block

  try {
    response = await fetch(`${SSL}/init`);
    if (!response.ok) {
      throw new Error("Failed to initiate payment");
    }

    const data = await response.json();
    const gatewayUrl = data?.GatewayPageURL;

    if (!gatewayUrl) {
      throw new Error("Payment Gateway URL is missing in the response");
    }

    console.log("Fetched GatewayPageURL:", gatewayUrl);
    return gatewayUrl;
  } catch (error) {
    if (response) {
      console.error("HTTP Status Code:", response.status); // Print the status code
    } else {
      console.error("No response object available");
    }

    console.error("Error fetching payment gateway URL:", error);
    throw error;
  }
};


//fetching user Information

export const fetchUserInfo = async (): Promise<User[]> => {
  try {
    const token = useAuthStore.getState().refreshToken; // Replace with the actual token or logic to fetch it

    const response = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user information: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Extract the `data` field containing the user info
    const user: User[] = responseData.data || [];
    console.log("Fetched user information:", user);

    return user;
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (updatedProfileData: UserProfileUpdate) => {
  const accessToken = useAuthStore.getState().refreshToken;

  if (!accessToken) {
    throw new Error("No access token found. Please log in again.");
  }

  const response = await axios.put(`${BASE_URL}/me`, updatedProfileData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data; // Return updated user profile data
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedProfileData: UserProfileUpdate) =>
      updateUserProfile(updatedProfileData),
    onSuccess: (data) => {
      console.log("User profile updated successfully:", data);

      // Invalidate `user` query to fetch updated user data
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("Error updating user profile:", error);
    },
  });
};


//Order Creation:
const createOrder = async (requestBody: { shipping_address: string; cart_id: number }) => {
  const accessToken = useAuthStore.getState().refreshToken; // Get the access token from Zustand store
  console.log('Access Token:', accessToken);

  if (!accessToken) {
    throw new Error('No access token found. Please log in again.');
  }

  try {
    const response = await axios.post(`${BASE_URL}/orders`, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`, // Add the access token to the Authorization header
      },
    });

    console.log('API Response:', response.data); // Log the API response
    return response.data; // Return the data from the API response
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message); // Log the error
    throw error; // Throw the error so it can be handled in the mutation
  }
};


export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (requestBody: { shipping_address: string; cart_id: number }) =>
      createOrder(requestBody),
    onSuccess: (data) => {
      console.log('Order created successfully:', data); // Log success message
    },
    onError: (error) => {
      console.error('Error creating order:', error); // Log error message
    },
  });
};


export const fetchOrders = async (query = ""): Promise<Order[]> => {
  try {
    // Construct the full URL with the query if provided
    const refreshToken = useAuthStore.getState().refreshToken;
    const url = `${BASE_URL}/orders${query ? `?query=${query}` : ''}`;

    // Fetch data from the API
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    // Check for non-OK responses
    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.statusText}`);
    }

    // Parse the JSON response
    const responseData = await response.json();

    // Extract the orders array from the `data` field
    const orders: Order[] = responseData.data || [];
    console.log("Fetched orders:", orders);

    return orders;
  } catch (error) {
    // Log and rethrow errors for higher-level handling
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const searchProductsByText = async (searchData: SearchRequest): Promise<SearchResponse> => {
  try {
    const formData = new URLSearchParams();
    formData.append('text_query', searchData.text_query);

    const response = await axios.post(`${BASE_URL}/search/text`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Search operation failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const useSearchProductsByText = () => {
  const queryClient = useQueryClient();

  return useMutation<SearchResponse, Error, SearchRequest>({
    mutationFn: searchProductsByText,
    onSuccess: (data) => {
      console.log('Search completed successfully:', data.message);
      if (data.data.length === 0) {
        console.log('No matching products found');
      } else {
        console.log('Products retrieved:', data.data.length);
      }
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error('Search error:', error.message);
    },
  });
};






export const searchProductsByImage = async (image: File): Promise<SearchResponse> => {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await axios.post(`${BASE_URL}/search/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Search operation failed');
    }
    throw new Error('An unexpected error occurred');
  }
};


export const useSearchProductsByImage = () => {
  const queryClient = useQueryClient();

  return useMutation<SearchResponse, Error, File>({
    mutationFn: searchProductsByImage,
    onSuccess: (data) => {
      console.log('Search completed successfully:', data.message);
      if (data.data.length === 0) {
        console.log('No matching products found');
      } else {
        console.log('Products retrieved:', data.data.length);
      }
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.error('Search error:', error.message);
    },
  });
};