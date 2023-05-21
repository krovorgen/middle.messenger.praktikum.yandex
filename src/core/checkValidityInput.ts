import { notifications } from '../components/Notification';

export const checkValidityInput = (el: HTMLInputElement) => {
  const isCorrect = el.checkValidity();
  if (!isCorrect) {
    notifications.addNotification(el.title, 'error');
  } else {
    notifications.addNotification(`Поле ${el.name} заполнено верно`, 'success');
  }
  return isCorrect;
};
