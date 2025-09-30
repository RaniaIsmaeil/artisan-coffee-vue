<template>
  <div class="container-pad py-10">
    <div v-if="product" class="grid gap-10 lg:grid-cols-2">
      <div class="rounded-2xl border bg-white p-6">
        <img
          :src="product.image_url"
          :alt="product.name"
          class="w-full h-96 object-contain"
        />
      </div>
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ product.name }}</h1>
        <p class="text-gray-600 mb-4">
          {{ product.roast_level }} • {{ product.origin }}
        </p>
        <div class="text-2xl font-extrabold text-espresso mb-6">
          ${{ product.price.toFixed(2) }}
        </div>
        <p class="text-gray-700 mb-8 max-w-prose">{{ product.description }}</p>

        <div class="flex items-center gap-3 mb-6">
          <label class="text-sm font-medium">Quantity</label>
          <input
            type="number"
            min="1"
            step="1"
            v-model.number="qty"
            @input="clampQty()"
            @blur="clampQty()"
            class="w-20 rounded-lg border px-3 py-2"
            inputmode="numeric"
          />
        </div>

        <button
          @click="add"
          class="rounded-lg bg-coffee-600 hover:bg-coffee-700 text-white px-6 py-3 font-medium transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <div v-else class="py-20 text-center text-gray-600">Product not found.</div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getProductById } from "../data/products";
import { useCartStore } from "../stores/cart";

const route = useRoute();
const router = useRouter();
const cart = useCartStore();

const product = computed(() => getProductById(route.params.id));
const qty = ref(1);

function clampQty() {
  qty.value = Math.max(1, Math.trunc(Number(qty.value) || 1));
}

function add() {
  if (!product.value) return;
  clampQty();
  cart.addItem(product.value, qty.value);
}
</script>
