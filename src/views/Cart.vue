<template>
  <div class="container-pad py-10">
    <h1 class="text-3xl font-bold mb-6">Your Cart</h1>

    <div v-if="items.length" class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <!-- Items -->
      <section class="space-y-4">
        <div
          v-for="it in items"
          :key="it.id"
          class="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-xl p-4 bg-white"
        >
          <img
            :src="it.image_url"
            :alt="it.name"
            class="w-20 h-20 object-contain mx-auto sm:mx-0"
          />
          <div class="flex-1 text-center sm:text-left">
            <h3 class="font-semibold">{{ it.name }}</h3>
            <p class="text-sm text-gray-600">
              ${{ it.price.toFixed(2) }} / bag
            </p>
          </div>
          <div class="flex items-center justify-center sm:justify-start gap-2">
            <button
              class="rounded-lg border px-2 py-1"
              @click="dec(it)"
              :disabled="it.quantity <= 1"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              step="1"
              v-model.number="it.quantity"
              @input="sanitize(it)"
              @blur="update(it)"
              class="w-16 rounded-lg border px-2 py-1 text-center"
              inputmode="numeric"
            />
            <button class="rounded-lg border px-2 py-1" @click="inc(it)">
              +
            </button>
          </div>
          <div class="w-full sm:w-24 text-center sm:text-right font-semibold">
            ${{ (it.price * it.quantity).toFixed(2) }}
          </div>
          <button class="text-red-600 hover:underline" @click="remove(it.id)">
            Remove
          </button>
        </div>
      </section>

      <!-- Summary -->
      <aside
        class="h-max sticky top-24 rounded-xl border bg-white p-6 space-y-3"
      >
        <h2 class="font-semibold text-lg">Order Summary</h2>
        <div class="flex justify-between text-sm">
          <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Tax (10%)</span><span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="border-t pt-3 font-bold flex justify-between">
          <span>Total</span><span>${{ total.toFixed(2) }}</span>
        </div>
        <RouterLink
          to="/checkout"
          class="w-full rounded-lg bg-espresso text-white px-4 py-2 mt-2 hover:opacity-95 text-center block"
          :class="{ 'opacity-50 pointer-events-none': !items.length }"
        >
          Checkout
        </RouterLink>
      </aside>
    </div>

    <div v-else class="py-16 text-center text-gray-600">
      Your cart is empty.
      <RouterLink to="/products" class="text-espresso underline"
        >Go shopping</RouterLink
      >.
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();
const { items, cartSubtotal } = storeToRefs(cart);

const subtotal = cartSubtotal;
const tax = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + tax.value);

function sanitize(it) {
  it.quantity = Math.max(1, Math.trunc(Number(it.quantity) || 1));
}

function update(it) {
  const q = Math.max(1, Math.trunc(Number(it.quantity) || 1));
  cart.updateQuantity(it.id, q);
}
function inc(it) {
  cart.updateQuantity(it.id, Math.max(1, Math.trunc(it.quantity) + 1));
}

function dec(it) {
  cart.updateQuantity(it.id, Math.max(1, Math.trunc(it.quantity) - 1));
}
function remove(id) {
  cart.removeItem(id);
}
</script>
