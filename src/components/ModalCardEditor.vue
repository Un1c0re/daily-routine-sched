<template>
  <el-dialog v-model="modalVisible" @close="closeDialog" width="40%">
    <template #header>
      <div class="flex w-full items-center">
        <p class="text-[2em]">{{ cardToEdit ? "Редактировать запись" : "Создать запись" }}</p>
      </div>
    </template>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="Заголовок" label-position="top" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="День и время" label-position="top" required>
        <el-col :span="4">
          <el-select v-model="form.day">
            <el-option
              v-for="option in dayOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-col>
        <el-col :span="1" />
        <el-col :span="9">
          <el-form-item prop="startTime">
            <el-time-select
              v-model="form.startTime"
              :start="computedStartTimeStart"
              :end="computedStartTimeEnd"
            />
          </el-form-item>
        </el-col>
        <el-col :span="1" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="endTime">
            <el-time-select v-model="form.endTime" :start="computedEndTimeStart" end="23:00" />
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="Подробнее" label-position="top">
        <el-input v-model="form.description" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submit">Сохранить</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from "element-plus";
import { computed, inject, reactive, ref, watch } from "vue";

import { ModalViewer } from "@/composables/useModalViewer";
import Card from "@/models/Card";
import { Form } from "@/models/Form";
import { useCardStore } from "@/store/CardStore";
import { dayOptions, getAdjustedDay } from "@/utils/constants";
import TimeHelpers from "@/utils/TimeHelpers";

const { modalVisible, editableValue: cardToEdit, close } = inject<ModalViewer>("modalViewer")!;
const store = useCardStore();

const formRef = ref<FormInstance>();
const form = reactive<Form>({
  title: "",
  day: getAdjustedDay(),
  startTime: "",
  endTime: "",
  description: "",
});

const rules = reactive<FormRules<Form>>({
  title: [
    { required: true, message: "Пожалуйста, заполните поле", trigger: "blur" },
    { min: 3, max: 16, message: "Длина поля должна быть от 3 до 16 символов", trigger: "blur" },
  ],
  startTime: [
    {
      type: "string",
      required: true,
      message: "Выберите время начала",
      trigger: "change",
    },
  ],
  endTime: [
    {
      type: "string",
      required: true,
      message: "Выберите время окончания",
      trigger: "change",
    },
  ],
});

const computedStartTimeStart = computed(() => {
  const maxTime = store.getMaxTimeByDay(form.day);

  return maxTime ?? "06:00";
});

const computedStartTimeEnd = computed(() => {
  if (form.endTime) {
    return TimeHelpers.decrementTime(form.endTime);
  }

  return "23:00";
});

const computedEndTimeStart = computed(() => {
  if (form.startTime) {
    return TimeHelpers.incrementTime(form.startTime);
  }

  const maxTime = store.getMaxTimeByDay(form.day);
  if (maxTime) {
    return TimeHelpers.incrementTime(maxTime);
  }

  return "06:30";
});

const submit = async () => {
  await formRef.value!.validate((valid, _) => {
    if (valid) {
      saveCard();
    }
  });
};

const saveCard = () => {
  if (cardToEdit.value) {
    const editedCard = new Card({ id: cardToEdit.value.id, ...form });
    store.editCard(editedCard);
  } else {
    const createdCard = new Card({ ...form });
    store.addCard(createdCard);
  }
  ElMessage.success("Запись добавлена");
  closeDialog();
};

const resetForm = () => {
  form.title = "";
  form.day = getAdjustedDay();
  form.startTime = "";
  form.endTime = "";
  form.description = "";
};

const closeDialog = () => {
  resetForm();
  close();
};

watch(
  cardToEdit,
  (card) => {
    form.title = card?.title ?? "";
    form.day = card?.day ?? getAdjustedDay();
    form.startTime = card?.startTime ?? "";
    form.endTime = card?.endTime ?? "";
    form.description = card?.description ?? "";
  },
  { immediate: true },
);
</script>
