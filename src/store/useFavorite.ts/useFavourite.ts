import { create } from 'zustand';
import { fetchWishlist } from '../../api';

// Define the shape of the store's state
interface FavoriteState {
  favorites: Set<number>; // Use a Set to store favorited product IDs
  toggleFavorite: (productId: number) => void;
  fetchAndSetFavorites: () => Promise<void>;
}

// Create the Zustand store
const useFavoriteStore = create<FavoriteState>((set) => ({
  favorites: new Set(),
  toggleFavorite: (productId) =>
    set((state) => {
      const newFavorites = new Set(state.favorites);
      if (state.favorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return { favorites: newFavorites };
    }),
  fetchAndSetFavorites: async () => {
    try {
      const wishlistItems = await fetchWishlist();
      const newFavorites = new Set(wishlistItems.map(item => item.product_id));
      set({ favorites: newFavorites });
    } catch (error) {
      console.error('Error fetching and setting favorites:', error);
    }
  },
}));

export default useFavoriteStore;