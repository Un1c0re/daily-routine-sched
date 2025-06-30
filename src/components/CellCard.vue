<template>
  <div class="relative">
    <el-button
      class="absolute left-0"
      circle
      text
      type="danger"
      :icon="Close"
      @click="deleteCard"
    />
    <div
      class="card-default max-w-[14em] min-h-[6em] max-h-[7em] p-2 rounded-md"
      @click="openEditor"
    >
      <p class="time text-sm col-start-2 justify-self-end self-start">
        {{ props.card.startTime }} - {{ props.card.endTime }}
      </p>
      <p class="description col-span-2 justify-self-start self-end">{{ props.card.title }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Close } from "@element-plus/icons-vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { inject } from "vue";

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
