<template>
  <div
    class="flex max-h-[3em] max-w-[14em] items-center rounded-md p-2"
    :style="{ 'background-color': props.isCurrentDay ? '#409EFF' : '#1D1E1F' }"
  >
    <p class="text-[2em]">{{ props.dayName }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dayName: String,
  isCurrentDay: Boolean,
});
</script>
