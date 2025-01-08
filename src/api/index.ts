import { CartResponse, Todo } from "../entities/Todo";
import { Brand } from "../entities/Todo"; // Fix the incorrect import
import { Product } from "../entities/Todo";
import {
  BrandIDProduct,
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
  Cart,
  WishlistRequest,
  WishlistResponse,
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
const BASE_URL = "https://c414-2a09-bac5-498-101e-00-19b-1d.ngrok-free.app";

/**
 * Fetches all products (todos) from the API.
 * Extracts the `data` field from the API response.
 */
export const fetchTodos = async (query = ""): Promise<Todo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch todos: ${response.statusText}`);
    }

    const responseData = await response.json();

    // Extract the `data` field containing the todos array
    const todos: Todo[] = responseData.data || [];
    console.log("Fetched todos (products):", todos);

    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
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

export const fetchBrandsProduct = async (
  BrandID: number
): Promise<BrandIDProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/brands/${BrandID}/products`);
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

    // Extract the `data` field containing the product
    const Brandproduct: BrandIDProduct[] = responseData.data;
    console.log("Fetched product by ID:", Brandproduct);

    return Brandproduct;
  } catch (error) {
    console.error(`Error fetching product with ID ${BrandID}:`, error);
    throw error;
  }
};

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
    const { access_token, refresh_token, user } = response.data;

    // Ensure user data exists, then call the login method from useAuthStore
    if (user && access_token && refresh_token) {
      useAuthStore.getState().login({
        user,
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
  });

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

const createWishlistItem = async (requestBody: { product_id: number }) => {
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
