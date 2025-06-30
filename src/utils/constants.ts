export const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const dayOptions = [
  {
    label: "Пн",
    value: 1,
  },
  {
    label: "Вт",
    value: 2,
  },
  {
    label: "Ср",
    value: 3,
  },
  {
    label: "Чт",
    value: 4,
  },
  {
    label: "Пт",
    value: 5,
  },
  {
    label: "Сб",
    value: 6,
  },
  {
    label: "Вс",
    value: 0,
  },
];

export const getAdjustedDay = () => {
  const today = new Date();
  const currentDay = today.getDay();
  return currentDay === 0 ? 6 : currentDay - 1;
};
