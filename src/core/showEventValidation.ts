import { notifications } from '../components/Notification';

export const showEventValidation = (el: HTMLInputElement) => {
  el.addEventListener('blur', () => {
    const pattern = new RegExp(el.pattern);
    if (!pattern.test(el.value)) {
      notifications.addNotification(`Для поля ${el.name} необходимо:\n ${el.title}`, 'warning');
    }
  });
  el.addEventListener('focus', () => {
    const pattern = new RegExp(el.pattern);
    if (!pattern.test(el.value)) {
      notifications.addNotification(`Для поля ${el.name} необходимо:\n ${el.title}`, 'warning');
    }
  });
};
