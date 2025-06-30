<template>
  <div
      class="card-default max-w-[14em] min-h-[6em] max-h-[7em] p-2 rounded-md grid grid-cols-2 grid-rows-2 justify-between"
      @click="openEditor">
    <p class="time text-sm col-start-2 justify-self-end self-start">{{ props.card.startTime }} - {{props.card.endTime}}</p>
    <p class="description col-span-2 justify-self-start self-end">{{ props.card.title }}</p>
  </div>
</template>

<script lang="ts" setup>

import {inject} from "vue";
import {ModalViewer} from "@/composables/useModalViewer";
import Card from "@/models/Card";

const {open} = inject<ModalViewer>('modalViewer')!;

const props = defineProps({
  card: {
    type: Card,
    required: true
  }
})
const openEditor = () => {
  open(props.card);
}
</script>

<style scoped>
.card-default {
  background: #262727;
  transition: all 0.2s ease;
  cursor: pointer;
}

.card-default .time {
  color: #909399;
  transition: all 0.2s ease;
}

.card-default .description {
  color: white;
}

.card-default:hover {
  background: #1D1E1F;
}

.card-default:hover .time {
  color: #409EFF;
}
</style>
