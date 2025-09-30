<template>
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur border-b">
    <div class="container-pad py-4 flex items-center">
      <!-- Logo (left) -->
      <RouterLink to="/" class="flex items-center gap-2">
        <img src="/logo.svg" alt="Roast & Bloom" class="h-8 w-8" />
        <span class="text-xl font-bold tracking-tight">Roast & Bloom</span>
      </RouterLink>

      <!-- Right side: Desktop nav + Cart -->
      <div class="ml-auto flex items-center gap-4 md:gap-6">
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-6">
          <RouterLink to="/" v-slot="{ isActive }">
            <span
              class="text-sm transition-colors"
              :class="
                isActive
                  ? 'text-coffee-700 font-bold'
                  : 'text-gray-700 hover:text-coffee-700'
              "
              >Home</span
            >
          </RouterLink>

          <RouterLink to="/products" v-slot="{ isActive }">
            <span
              class="text-sm transition-colors"
              :class="
                isActive
                  ? 'text-coffee-700 font-bold'
                  : 'text-gray-700 hover:text-coffee-700'
              "
              >Products</span
            >
          </RouterLink>
        </nav>

        <!-- Cart (always visible) -->
        <RouterLink
          to="/cart"
          class="relative inline-flex items-center gap-2 rounded-full border px-3 py-2 hover:bg-crema transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2Zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2ZM7.17 14h9.58c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 21.17 5H6.21l-.94-2H2v2h2l3.6 7.59-1.35 2.44A2.01 2.01 0 0 0 6 18h12v-2H6l1.17-2Z"
            />
          </svg>
          <span class="text-sm font-medium hidden sm:inline">Cart</span>
          <span
            v-if="count"
            class="absolute -top-2 -right-2 inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-espresso px-1 text-xs font-bold text-white"
            >{{ count }}</span
          >
        </RouterLink>

        <!-- Mobile Menu Button -->
        <button
          @click="open = !open"
          class="md:hidden ml-1 inline-flex p-2 rounded hover:bg-crema"
          :aria-expanded="open.toString()"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Nav (pages only) -->
    <div v-if="open" id="mobile-nav" class="md:hidden border-t bg-white">
      <nav class="flex flex-col p-4 space-y-2">
        <RouterLink to="/" v-slot="{ isActive }" @click="open = false">
          <span
            class="block py-2 px-2 rounded transition-colors"
            :class="
              isActive
                ? 'bg-crema text-coffee-800 font-medium'
                : 'hover:bg-crema hover:text-coffee-800'
            "
            >Home</span
          >
        </RouterLink>

        <RouterLink to="/products" v-slot="{ isActive }" @click="open = false">
          <span
            class="block py-2 px-2 rounded transition-colors"
            :class="
              isActive
                ? 'bg-crema text-coffee-800 font-medium'
                : 'hover:bg-crema hover:text-coffee-800'
            "
            >Products</span
          >
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed, ref } from "vue";
import { useCartStore } from "../stores/cart";

const cart = useCartStore();
const count = computed(() => cart.cartTotalItems);
const open = ref(false);
</script>
