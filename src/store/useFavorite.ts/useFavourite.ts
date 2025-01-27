import { createWishlistItem , deleteWishlistItem } from '../../api';
import { create } from 'zustand';
// Define the shape of the store's state
interface FavoriteState {
  isFavorited: boolean;
  wishlistId: number | null;
  toggleFavorite: (productId: number) => Promise<void>;
}

// Create the Zustand store
const useFavoriteStore = create<FavoriteState>((set) => ({
  isFavorited: false,
  wishlistId: null,
  toggleFavorite: async (productId: number) => {
    set((state) => {
      if (state.isFavorited) {
        // If already favorited, delete from wishlist
        deleteWishlistItem(state.wishlistId!)
          .then(() => {
            set({ isFavorited: false, wishlistId: null });
          })
          .catch(console.error);
        return state; // Return current state until the promise resolves
      } else {
        // If not favorited, add to wishlist
        createWishlistItem({ product_id: productId })
          .then((response) => {
            set({ isFavorited: true, wishlistId: response.id });
          })
          .catch(console.error);
        return state; // Return current state until the promise resolves
      }
    });
  },
}));

export default useFavoriteStore;