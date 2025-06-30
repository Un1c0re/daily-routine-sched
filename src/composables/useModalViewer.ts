import {Ref, ref} from "vue";
import Card from "@/models/Card";

export const useModalViewer = () => {
    const modalVisible = ref(false);
    const editableValue = ref<Card | null>(null);

    const open = (card: Card | null = null) => {
        editableValue.value = card;
        modalVisible.value = true;
    };

    const close = () => {
        modalVisible.value = false;
        editableValue.value = null;
    };

    return {
        modalVisible,
        editableValue,
        open,
        close,
    };
};

export type ModalViewer = {
    modalVisible: Ref<boolean>;
    editableValue: Ref<Card | null>;
    open: (card?: Card | null) => void;
    close: () => void;
};
