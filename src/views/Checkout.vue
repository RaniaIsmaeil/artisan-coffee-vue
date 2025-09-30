<template>
  <div class="container-pad py-10 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">Checkout</h1>

    <div v-if="items.length" class="grid gap-8 lg:grid-cols-[1fr_360px]">
      <!-- Form -->
      <form
        @submit.prevent="placeOrder"
        class="space-y-4 rounded-2xl border bg-white p-6"
      >
        <h2 class="font-semibold text-lg mb-2">Shipping Details</h2>

        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <label class="text-sm">Full name</label>
            <input
              v-model.trim="form.name"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div>
            <label class="text-sm">Email</label>
            <input
              v-model.trim="form.email"
              type="email"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div class="sm:col-span-2">
            <label class="text-sm">Address</label>
            <input
              v-model.trim="form.address"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div>
            <label class="text-sm">City</label>
            <input
              v-model.trim="form.city"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div>
            <label class="text-sm">Country</label>
            <input
              v-model.trim="form.country"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
          <div>
            <label class="text-sm">Phone</label>
            <input
              v-model.trim="form.phone"
              required
              class="w-full rounded-lg border px-3 py-2"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="processing"
          class="w-full rounded-lg bg-coffee-600 text-white px-4 py-2 mt-2 hover:bg-coffee-700 disabled:opacity-50"
        >
          {{ processing ? "Placing order…" : "Place Order" }}
        </button>
      </form>

      <!-- Summary -->
      <aside class="h-max rounded-2xl border bg-white p-6 space-y-3">
        <h2 class="font-semibold text-lg">Order Summary</h2>
        <div class="flex justify-between text-sm">
          <span>Items ({{ cartTotalItems }})</span
          ><span>${{ subtotal.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Shipping</span><span>${{ shipping.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Tax (10%)</span><span>${{ tax.toFixed(2) }}</span>
        </div>
        <div class="border-t pt-3 font-bold flex justify-between">
          <span>Total</span><span>${{ total.toFixed(2) }}</span>
        </div>
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
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";

const router = useRouter();
const cart = useCartStore();
const { items, cartSubtotal, cartTotalItems } = storeToRefs(cart);

const form = reactive({
  name: "",
  email: "",
  address: "",
  city: "",
  country: "",
  phone: "",
});

const subtotal = cartSubtotal;
const shipping = computed(() => (subtotal.value > 0 ? 3 : 0));
const tax = computed(() => (subtotal.value + shipping.value) * 0.1);
const total = computed(() => subtotal.value + shipping.value + tax.value);

const processing = ref(false);

function mkOrderId() {
  return "RB-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

async function placeOrder() {
  if (!items.value.length) return;
  processing.value = true;
  try {
    if (!form.name || !form.email || !form.address)
      throw new Error("Please fill required fields.");

    const order = {
      id: mkOrderId(),
      createdAt: new Date().toISOString(),
      customer: { ...form },
      items: items.value.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
      })),
      amounts: {
        subtotal: subtotal.value,
        shipping: shipping.value,
        tax: tax.value,
        total: total.value,
      },
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    cart.clearCart();
    router.push("/thank-you");
  } catch (e) {
    alert(e.message || "Could not place order.");
  } finally {
    processing.value = false;
  }
}
</script>
