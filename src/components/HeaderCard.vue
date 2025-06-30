<template>
  <div class="max-w-[14em] max-h-[3em] p-2 rounded-md flex items-center"
       :style="{'background-color' : props.isCurrentDay ? '#409EFF' : '#1D1E1F'}">
    <p class="text-[2em]">{{ props.dayName }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dayName: String,
  isCurrentDay: Boolean
});
</script>
