import { Todo } from "../entities/Todo";
import { Brand } from "../entities/Todo"; // Fix the incorrect import
import { Product } from "../entities/Todo";
import { BrandIDProduct } from "../entities/Todo";
// Base URL for the API
const BASE_URL = 'https://57ec-2a09-bac1-b20-518-00-19b-15a.ngrok-free.app';

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
export const fetchProductById = async (productID: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${BASE_URL}/products/${productID}`);
    if (!response.ok) {
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

export const fetchBrandsProduct = async (BrandID: number): Promise<BrandIDProduct[]> => {
  try {
    const response = await fetch(`${BASE_URL}/brands/${BrandID}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products by Brand ID: ${response.statusText}`);
    }

    const responseData = await response.json();
    if (!responseData || !Array.isArray(responseData.data)) {
      throw new Error(`Unexpected API response format: ${JSON.stringify(responseData)}`);
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
