<template>
  <div class="container-pad py-16 text-center">
    <h1 class="text-3xl font-bold mb-2">Thank you!</h1>
    <p class="text-gray-600 mb-8">Your order has been received.</p>

    <div
      v-if="order"
      class="mx-auto max-w-xl text-left rounded-2xl border bg-white p-6"
    >
      <div class="flex justify-between mb-3">
        <span class="font-medium">Order ID</span><span>{{ order.id }}</span>
      </div>
      <div class="flex justify-between mb-3">
        <span class="font-medium">Total</span
        ><span>${{ order.amounts.total.toFixed(2) }}</span>
      </div>
      <ul class="text-sm text-gray-700 list-disc pl-5">
        <li v-for="it in order.items" :key="it.id">
          {{ it.quantity }} × {{ it.name }} — ${{
            (it.price * it.quantity).toFixed(2)
          }}
        </li>
      </ul>
    </div>

    <RouterLink
      to="/products"
      class="inline-block mt-8 rounded-lg border px-4 py-2 hover:bg-crema"
    >
      Continue shopping
    </RouterLink>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const order = ref(null);
onMounted(() => {
  const raw = localStorage.getItem("lastOrder");
  if (raw) order.value = JSON.parse(raw);
});
</script>
