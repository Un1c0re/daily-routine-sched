<template>
  <div class="h-full w-full flex flex-col justify-between">
    <h1 class="self-start">Daily Routine Sched</h1>
    <TheGrid/>
    <footer ref="footer" class="footer"/>
  </div>
</template>

<script setup lang="ts">
import TheGrid from "@/components/TheGrid.vue";
import {ref} from "vue";

const footer = ref();
</script>


<style scoped>
.footer {
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: end;
}
</style>