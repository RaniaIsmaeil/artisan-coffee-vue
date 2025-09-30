<template>
  <section>
    <!-- Hero -->
    <div class="bg-[linear-gradient(180deg,#fff,rgba(246,242,232,0.9))] border-b">
      <div class="container-pad py-12 lg:py-20 grid gap-10 lg:grid-cols-2 items-center">
        <div class="space-y-6 text-center lg:text-left">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Elevate Your Daily Ritual with <span class="text-coffee-600">Artisanal Beans</span>
          </h1>
          <p class="text-base sm:text-lg text-gray-700 max-w-prose mx-auto lg:mx-0">
            Small-batch roasted, ethically sourced, and precision crafted for a cup that’s bright, balanced, and unforgettable.
          </p>
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-3">
            <RouterLink to="/products" class="inline-flex items-center justify-center gap-2 rounded-lg bg-coffee-600 hover:bg-coffee-700 text-white px-5 py-3 font-medium transition">
              Shop Now
            </RouterLink>
          </div>
        </div>
        <div class="relative">
          <img src="/images/hero-coffee.webp" alt="Coffee hero" class="w-full max-w-xs sm:max-w-md mx-auto">
        </div>
      </div>
    </div>

    <!-- Featured Grid -->
    <div class="container-pad py-12">
      <h2 class="text-2xl font-bold mb-6 text-center lg:text-left">Featured Coffees</h2>
      <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <article v-for="p in featured" :key="p.id" class="rounded-xl border hover:shadow-md transition bg-white">
          <RouterLink :to="`/products/${p.id}`" class="block">
            <img :src="p.image_url" :alt="p.name" class="w-full h-56 object-contain p-6">
            <div class="px-6 pb-6">
              <h3 class="font-semibold text-lg">{{ p.name }}</h3>
              <p class="text-sm text-gray-600">{{ p.roast_level }} • {{ p.origin }}</p>
              <div class="mt-3 font-bold text-espresso">${{ p.price.toFixed(2) }}</div>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>

    <!-- About -->
    <div id="about" class="bg-crema/70 border-t">
      <div class="container-pad py-12 grid gap-8 md:grid-cols-2 items-center">
        <div class="text-center md:text-left">
          <h2 class="text-2xl font-bold mb-4">About Roast & Bloom</h2>
          <p class="text-gray-700">
            We partner directly with small farms and co-ops to source distinctive green coffees.
            Our roasters bring out each bean’s unique character, never burnt, always balanced.
          </p>
        </div>
        <img src="/images/about-bags.webp" alt="About coffee bags" class="w-full max-w-sm mx-auto">
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { products } from '../data/products'

const featured = computed(() => products.slice(0, 6))
</script>
