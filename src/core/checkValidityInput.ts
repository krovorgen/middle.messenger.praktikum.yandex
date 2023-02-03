import { notifications } from '../components/Notification';

export const checkValidityInput = (el: HTMLInputElement) => {
  if (!el.checkValidity()) {
    notifications.addNotification(el.title, 'error');
  } else {
    notifications.addNotification(`Поле ${el.name} заполнено верно`, 'success');
  }
};
