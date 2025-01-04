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

  // Login and save user data
  login: async ({  accessToken, refreshToken }) => {
    if ( accessToken && refreshToken) {
      try {
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('refresh_token', refreshToken);
        // await AsyncStorage.setItem('user', JSON.stringify(user));
      } catch (error) {
        console.error('Error saving auth data to AsyncStorage:', error);
        return;
      }

      set({
        // user,
        accessToken,
        refreshToken,
        isAuthenticated: true,
      });
    } else {
      console.error('Invalid login data: user, accessToken, and refreshToken must be provided.');
    }
  },

  // Logout and clear data
  logout: async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('user');
    } catch (error) {
      console.error('Error clearing auth data from AsyncStorage:', error);
    }

    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
    });
  },

  // Load stored auth data on app start
  loadStoredAuth: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');
      // const userString = await AsyncStorage.getItem('user');

      if (accessToken && refreshToken ) {
        // const user: User = JSON.parse(userString);
        set({
         
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
