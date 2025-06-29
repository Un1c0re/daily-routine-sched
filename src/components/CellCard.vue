<template>
  <div class="card-default w-[14rem] h-[7rem] p-2 rounded-md grid grid-cols-2 grid-rows-2 justify-between">
    <p class="time text-sm col-start-2 justify-self-end self-start">Время</p>
    <p class="description col-start-1 justify-self-start self-end">Описание</p>
  </div>
</template>

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