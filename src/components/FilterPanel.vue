<template>
  <div>
    <!-- Roast Level -->
    <div class="mb-4">
      <h3 class="text-sm font-medium mb-2">Roast Level</h3>
      <div class="flex flex-col gap-2">
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" value="Light" v-model="filters.roast" /> Light
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" value="Medium" v-model="filters.roast" />
          Medium
        </label>
        <label class="inline-flex items-center gap-2">
          <input type="checkbox" value="Dark" v-model="filters.roast" /> Dark
        </label>
      </div>
    </div>

    <!-- Origin -->
    <div class="mb-4">
      <h3 class="text-sm font-medium mb-2">Origin</h3>
      <div class="flex flex-col gap-2">
        <label
          v-for="o in origins"
          :key="o"
          class="inline-flex items-center gap-2"
        >
          <input type="checkbox" :value="o" v-model="filters.origin" /> {{ o }}
        </label>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button
        @click="$emit('reset')"
        class="flex-1 rounded-lg border px-4 py-2 hover:bg-crema"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  filters: { type: Object, required: true }, // { roast:[], origin:[] }
  origins: { type: Array, required: true },
});
defineEmits(["reset"]);
</script>
