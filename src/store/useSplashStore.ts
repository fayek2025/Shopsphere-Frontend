import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the store's state
interface SplashState {
  hasShownSplash: boolean;
  checkSplashShown: () => Promise<void>;
  setSplashShown: () => Promise<void>;
}

// Create the Zustand store
const useSplashStore = create<SplashState>((set) => ({
  hasShownSplash: false,
  checkSplashShown: async () => {
    const splashShown = await AsyncStorage.getItem('hasShownSplash');
    if (splashShown) {
      set({ hasShownSplash: true });
    }
  },
  setSplashShown: async () => {
    await AsyncStorage.setItem('hasShownSplash', 'true');
    set({ hasShownSplash: true });
  },
}));

export default useSplashStore;