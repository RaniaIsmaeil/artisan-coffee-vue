<template>
  <div class="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
    <Header />
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="border-t mt-16">
      <div
        class="container-pad py-10 flex flex-col items-center justify-center gap-4 text-center"
      >
        <p class="text-sm text-gray-600">
          © {{ new Date().getFullYear() }} Roast & Bloom.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
</script>
