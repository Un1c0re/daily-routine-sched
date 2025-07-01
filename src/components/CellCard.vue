<template>
  <div class="relative" @mouseenter="() => (hovered = true)" @mouseleave="() => (hovered = false)">
    <el-button
      v-show="hovered"
      class="absolute left-0"
      circle
      text
      type="danger"
      :icon="Close"
      @click="deleteCard"
    />
    <div
      class="card-default max-h-[7em] min-h-[6em] max-w-[14em] rounded-md p-2"
      @click="openEditor"
    >
      <p class="time col-start-2 self-start justify-self-end text-sm">
        {{ props.card.startTime }} - {{ props.card.endTime }}
      </p>
      <p class="description col-span-2 self-end justify-self-start">{{ props.card.title }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { inject, ref } from "vue";

import { ModalViewer } from "@/composables/useModalViewer";
import Card from "@/models/Card";
import { useCardStore } from "@/store/CardStore";

const { open } = inject<ModalViewer>("modalViewer")!;

const store = useCardStore();

const props = defineProps({
  card: {
    type: Card,
    required: true,
  },
});

const hovered = ref(false);

const openEditor = () => {
  open(props.card);
};

const deleteCard = () => {
  ElMessageBox.confirm("Удалить запись?", "Внимание").then(() => {
    store.deleteCard(props.card);
    ElMessage.success("Запись удалена");
  });
};
</script>

<style scoped>
.card-default {
  background: #262727;
  transition: all 0.2s ease;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-content: stretch;
}

.card-default .time {
  color: #909399;
  transition: all 0.2s ease;
}

.card-default .description {
  color: white;
}

.card-default:hover {
  background: #1d1e1f;
}

.card-default:hover .time {
  color: #409eff;
}
</style>
