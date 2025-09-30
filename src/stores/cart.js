import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [], // { id, name, price, quantity, image_url }
  }),
  getters: {
    cartTotalItems: (state) =>
      state.items.reduce((sum, it) => sum + it.quantity, 0),

    cartSubtotal: (state) =>
      state.items.reduce((sum, it) => sum + it.price * it.quantity, 0),

    cartTotalPrice() {
      const tax = this.cartSubtotal * 0.1;
      return this.cartSubtotal + tax;
    },
  },
  actions: {
    addItem(product, quantity = 1) {
      const safeQty = Math.max(1, Number(quantity) || 1);
      const existing = this.items.find((i) => i.id === product.id);

      if (existing) {
        existing.quantity += safeQty;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          quantity: safeQty,
        });
      }
    },

    removeItem(productId) {
      this.items = this.items.filter((i) => i.id !== productId);
    },

    updateQuantity(productId, newQuantity) {
      const it = this.items.find((i) => i.id === productId);
      if (!it) return;
      it.quantity = Math.max(1, Number(newQuantity) || 1);
    },

    clearCart() {
      this.items = [];
    },
  },
});
