import _ from "lodash";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import Card from "@/models/Card";

export const useCardStore = defineStore("CardStore", () => {
  const cards = ref<Array<Card>>([]);

  function $reset() {
    cards.value = [];
  }

  const groupedCards = computed(() => {
    const grouped = _.groupBy(cards.value, (c) => c.day);

    return _.range(0, 7).map((day) => {
      return {
        day,
        cards: _.sortBy(grouped[day] ?? [], "startTime"),
      };
    });
  });

  const addCard = (newCard: Card) => {
    cards.value.push(newCard);
  };

  const editCard = (editedCard: Card) => {
    const card = cards.value.find((x) => x.id == editedCard.id);
    if (card) {
      const index = cards.value.findIndex((x) => x.id == editedCard.id);
      cards.value[index] = editedCard;
    }
  };

  const deleteCard = (deletedCard: Card) => {
    const card = cards.value.find((x) => x.id == deletedCard.id);
    if (card) {
      const index = cards.value.findIndex((x) => x.id == deletedCard.id);
      cards.value.splice(index, 1);
    }
  };

  const getMaxTimeByDay = (day: number) => {
    const cardsByDay = cards.value.filter((card) => card.day == day);

    if (cardsByDay.length == 0) return null;
    return _.maxBy(cardsByDay, (c) => c.endTime)!.endTime;
  };

  return {
    cards,
    $reset,
    groupedCards,
    addCard,
    editCard,
    deleteCard,
    getMaxTimeByDay,
  };
});
