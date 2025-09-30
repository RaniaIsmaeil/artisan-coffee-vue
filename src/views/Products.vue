<template>
  <div class="container-pad py-10">
    <h1 class="text-3xl font-bold mb-6">
      Products
      <span class="text-gray-500 text-lg">({{ filteredProducts.length }})</span>
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
      <!-- Sidebar Filters -->
      <aside
        class="rounded-2xl border bg-white p-4 md:p-5 h-max md:sticky md:top-24"
      >
        <FilterPanel :filters="filters" :origins="origins" @reset="onReset" />
      </aside>

      <!-- Products grid -->
      <section>
        <div
          v-if="filteredProducts.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <article
            v-for="p in filteredProducts"
            :key="p.id"
            class="rounded-2xl border bg-white p-3 hover:shadow-sm transition"
          >
            <RouterLink :to="`/products/${p.id}`" class="block">
              <div
                class="aspect-square rounded-xl border flex items-center justify-center bg-white mb-3 overflow-hidden"
              >
                <img
                  :src="p.image_url"
                  :alt="p.name"
                  class="w-full h-full object-contain"
                />
              </div>
              <h3 class="font-semibold line-clamp-1">{{ p.name }}</h3>
              <p class="text-sm text-gray-600">
                {{ p.origin }} · {{ p.roast_level }}
              </p>
              <div class="mt-2 font-bold text-espresso">
                ${{ p.price.toFixed(2) }}
              </div>
            </RouterLink>
          </article>
        </div>

        <div v-else class="py-16 text-center text-gray-600">
          No products match your filters.
          <button class="ml-1 underline text-espresso" @click="onReset">
            Reset filters
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import FilterPanel from "../components/FilterPanel.vue";
import { products as seedProducts } from "../data/products";

const route = useRoute();
const router = useRouter();

const allProducts = ref(
  Array.isArray(seedProducts)
    ? seedProducts
    : typeof seedProducts === "function"
    ? seedProducts()
    : []
);

const origins = computed(() => {
  const s = new Set(allProducts.value.map((p) => p.origin).filter(Boolean));
  return Array.from(s).sort();
});

const filters = reactive({
  roast: [],
  origin: [],
});

function toArray(v) {
  if (v == null) return [];
  if (Array.isArray(v)) return v;
  return String(v)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function loadFromRoute() {
  const q = route.query;
  filters.roast = toArray(q.roast);
  filters.origin = toArray(q.origin);
}

let routeTimer = null;
function writeToRoute() {
  clearTimeout(routeTimer);
  routeTimer = setTimeout(() => {
    const next = {};
    if (filters.roast.length) next.roast = [...filters.roast];
    if (filters.origin.length) next.origin = [...filters.origin];
    router.replace({ query: next });
  }, 120);
}

watch(() => route.query, loadFromRoute, { immediate: true });

watch(filters, writeToRoute, { deep: true });

const filteredProducts = computed(() => {
  const { roast, origin } = filters;
  return allProducts.value.filter((p) => {
    const roastOk = !roast.length || roast.includes(p.roast_level);
    const originOk = !origin.length || origin.includes(p.origin);
    return roastOk && originOk;
  });
});

function onReset() {
  filters.roast = [];
  filters.origin = [];
  router.replace({ query: {} });
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
