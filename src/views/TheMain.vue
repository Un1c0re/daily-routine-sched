<template>
  <div class="h-full w-full flex flex-col justify-between gap-10">
    <h1 class="self-start">Daily Routine Sched</h1>
    <TheGrid/>
    <ModalCardEditor />
  </div>
</template>

<script setup lang="ts">
import TheGrid from "@/components/TheGrid.vue";
import ModalCardEditor from "@/components/ModalCardEditor.vue";
import {useModalViewer} from "@/composables/useModalViewer";
import {provide} from "vue";

const modal = useModalViewer();
provide('modalViewer', modal);
</script>
