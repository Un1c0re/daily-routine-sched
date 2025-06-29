<template>
  <div class="w-[14rem] h-[3rem] p-2 rounded-md flex items-center"
       :style="{'background-color' : isCurrentDay ? '#409EFF' : '#1D1E1F'}">
    <p class="text-5xl">{{ dayName }}</p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  dayName: String,
  isCurrentDay: Boolean
});
</script>
