<template>
  <el-dialog v-model="modalVisible" @close="closeDialog" width="40%">
    <template #header>
      <div class="w-full flex items-center">
        <p class="text-[2em]">{{ cardToEdit ? "Edit card" : "Create card" }}</p>
      </div>
    </template>
    <el-form :model="form">
      <el-form-item label="title" label-position="top">
        <el-input v-model="form.title"/>
      </el-form-item>

      <el-form-item label="day and time" label-position="top">
        <el-col :span="4">
          <el-select v-model="form.day">
            <el-option v-for="option in dayOptions" :key="option.value" :label="option.label" :value="option.value"/>
          </el-select>
        </el-col>
        <el-col :span="1"/>
        <el-col :span="9">
          <el-time-select v-model="form.startTime"/>
        </el-col>
        <el-col :span="1" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="9">
          <el-time-select v-model="form.endTime"/>
        </el-col>
      </el-form-item>

      <el-form-item label="description" label-position="top">
        <el-input v-model="form.description" :autosize="{minRows: 2, maxRows: 4}"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="cardToEdit != null" type="danger" @click="deleteCard">Delete</el-button>
        <el-button type="primary" @click="submit">Submit</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {inject, reactive, watch} from "vue";
import {ModalViewer} from "@/composables/useModalViewer";
import {dayOptions} from "@/utils/constants";
import Card from "@/models/Card";
import {useCardStore} from "@/store/CardStore";
import {ElMessage, ElMessageBox} from "element-plus";

interface FormModel {
  title: string;
  day: number;
  startTime: string;
  endTime: string;
  description: string;
}

const {modalVisible, editableValue: cardToEdit, close} = inject<ModalViewer>('modalViewer')!;
const store = useCardStore();

const form = reactive<FormModel>({
  title: "",
  day: 1,
  startTime: "",
  endTime: "",
  description: "",
});

const submit = () => {
  if (!form.title || !form.startTime || !form.endTime) {
    ElMessage.warning("Please fill in all required fields");
    return;
  }

  if (cardToEdit.value) {
    const editedCard = new Card({id: cardToEdit.value.id, ...form})
    store.editCard(editedCard);
  } else {
    const createdCard = new Card({...form});
    store.addCard(createdCard);
  }
  ElMessage.success("Card added")
  closeDialog();
}

const deleteCard = () => {
  if(cardToEdit.value == null) return;

  ElMessageBox.confirm('Delete card?', 'Warning').then(() => {
    store.deleteCard(cardToEdit.value!);
    closeDialog();
    ElMessage.success("Card deleted");
  })
}

const resetForm = () => {
  form.title = "";
  form.day = 1;
  form.startTime = "";
  form.endTime = "";
  form.description = "";
}

const closeDialog = () => {
  resetForm();
  close();
}

watch(cardToEdit, (card) => {
  form.title = card?.title ?? "";
  form.day = card?.day ?? 1;
  form.startTime = card?.startTime ?? "";
  form.endTime = card?.endTime ?? "";
  form.description = card?.description ?? "";
}, { immediate: true });

</script>
