<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-7 grid-rows1 gap-2">
      <HeaderCard
          v-for="(day, index) in weekDays"
          :key="index"
          :day-name="day.name"
          :is-current-day="day.isCurrent"
      />
    </div>
    <div class="flex-1 h-full w-full grid grid-cols-7 gap-2">
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
      <CellCard/>
    </div>
    <Teleport to=".footer">
      <el-button type="primary" :icon="Plus">Create Card</el-button>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import CellCard from "@/components/CellCard.vue";
import HeaderCard from "@/components/HeaderCard.vue";
import {Plus} from "@element-plus/icons-vue";
import {computed} from "vue";

const today = new Date();
const currentDay = today.getDay();

const weekDays = computed(() => {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const adjustedCurrentDay = currentDay === 0 ? 6 : currentDay - 1;

  return days.map((name, i) => ({
    name,
    isCurrent: i === adjustedCurrentDay
  }));
});
</script>


<style scoped>

</style>