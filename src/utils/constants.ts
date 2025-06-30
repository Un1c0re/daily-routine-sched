export const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
export const dayOptions = [
  {
    label: "Пн",
    value: 0,
  },
  {
    label: "Вт",
    value: 1,
  },
  {
    label: "Ср",
    value: 2,
  },
  {
    label: "Чт",
    value: 3,
  },
  {
    label: "Пт",
    value: 4,
  },
  {
    label: "Сб",
    value: 5,
  },
  {
    label: "Вс",
    value: 6,
  },
];

export const getAdjustedDay = () => {
  const today = new Date();
  const currentDay = today.getDay();
  return currentDay === 0 ? 6 : currentDay - 1;
};
