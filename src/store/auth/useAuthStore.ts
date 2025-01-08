import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: number;
  username: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (data: {  accessToken: string; refreshToken: string }) => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  // Login function
  login: async ({  accessToken, refreshToken }) => {
    if (accessToken && refreshToken) {
      try {
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('refresh_token', refreshToken);
        // await AsyncStorage.setItem('user', JSON.stringify(user));  // Store the user data

        set({
          
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error('Error saving auth data to AsyncStorage:', error);
      }
    } else {
      console.error('Invalid login data: user, accessToken, and refreshToken must be provided.');
    }
  },

  // Logout function to clear user and tokens from both the state and AsyncStorage
  logout: async () => {
    try {
      // Clear stored data from AsyncStorage
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing auth data from AsyncStorage:', error);
    }

    // Update Zustand state to reflect that the user is logged out
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  // Load stored auth data when the app starts
  loadStoredAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      const userString = await AsyncStorage.getItem('user');

      if (accessToken && refreshToken && userString) {
        const user: User = JSON.parse(userString);
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      console.error('Error loading auth data from AsyncStorage:', error);
    }
  },
}));
