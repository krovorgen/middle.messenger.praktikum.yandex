import { notifications } from '../components/Notification';

export const showEventValidation = (el: Event) => {
  const input = (el.target as HTMLInputElement);
  const pattern = new RegExp(input.pattern);
  if (!pattern.test(input.value)) {
    notifications.addNotification(`Для поля ${input.name} необходимо:\n ${input.title}`, 'warning');
  }
};
