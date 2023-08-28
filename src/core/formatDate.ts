export const formatDate = (inputDate: string): string => {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];

  const [datePart, timePart] = inputDate.split('T');
  const [, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.substring(0, 5).split(':').map(Number);
  console.log(`${day} ${months[month - 1]} ${hour}:${minute}`);
  return `${day} ${months[month - 1]} ${hour}:${minute}`;
};
