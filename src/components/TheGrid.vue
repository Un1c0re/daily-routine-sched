<template>
  <div class="min-h-[30em] flex flex-col gap-2">
    <div class="grid grid-cols-7 grid-rows1 gap-2">
      <HeaderCard
        v-for="(day, index) in weekDays"
        :key="index"
        :day-name="day.name"
        :is-current-day="day.isCurrent"
      />
    </div>
    <div class="flex-1 h-full w-full grid grid-cols-7 gap-2">
      <div v-for="dayGroup in store.groupedCards" :key="dayGroup.day">
        <CellCard v-for="card in dayGroup.cards" :key="card.id" :card="new Card({ ...card })" />
      </div>
    </div>
    <teleport to="footer">
      <el-button type="primary" size="large" :icon="Plus" @click="open()"
        >Добавить запись
      </el-button>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { computed, inject } from "vue";

import CellCard from "@/components/CellCard.vue";
import HeaderCard from "@/components/HeaderCard.vue";
import { ModalViewer } from "@/composables/useModalViewer";
import Card from "@/models/Card";
import { useCardStore } from "@/store/CardStore";
import { days, getAdjustedDay } from "@/utils/constants";

const { open } = inject<ModalViewer>("modalViewer")!;
const store = useCardStore();

const weekDays = computed(() => {
  const adjustedCurrentDay = getAdjustedDay();
  return days.map((name, i) => ({
    name,
    isCurrent: i === adjustedCurrentDay,
  }));
});
</script>
