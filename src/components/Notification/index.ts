import { v4 } from 'uuid';

const createNotification = (message: string, type: 'success' | 'error' | 'warning', id: string) => {
  const fragment = document.createElement('template');
  let template = `
      <li class="notification__item {{type}}" data-id="{{id}}">
        <p class="notification__msg">{{message}}</p>
      </li>
  `;
  template = template.replace('{{type}}', type).replace('{{message}}', message).replace('{{id}}', id);
  fragment.innerHTML = template;
  return fragment.content;
};

export class NotificationService {
  public rootElement: HTMLElement | null = null;

  public notificationsId: string[] = [];

  constructor() {
    this.init();
  }

  public addNotification(message: string, type: 'success' | 'error' | 'warning') {
    const id = v4();
    const notification = createNotification(message, type, id);
    this.rootElement?.append(notification);
    if (this.notificationsId) {
      this.notificationsId = [...this.notificationsId, id];
    } else {
      this.notificationsId = [id];
    }

    setTimeout(() => {
      this.removeNotification(id);
    }, 4000);
  }

  private removeNotification(removeId: string) {
    this.rootElement?.querySelector(`[data-id="${removeId}"]`)?.remove();
  }

  private init() {
    const ul = document.createElement('ul');
    ul.classList.add('notification');
    document.body.append(ul);
    this.rootElement = ul;
  }
}

export const notifications = new NotificationService();
