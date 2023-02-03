import { v4 } from 'uuid';
import { Block } from '../../core/Block';
import tpl from './notification.hbs';

class Notification {
  message: string;

  type: 'success' | 'error' | 'warning';

  id: string;

  constructor(message: string, type: 'success' | 'error' | 'warning', id: string) {
    this.message = message;
    this.type = type;
    this.id = id;
  }
}

interface NotificationServiceProps {
  notifications?: Notification[]
  attr?: Record<string, string>
}

export class NotificationService extends Block<NotificationServiceProps> {
  constructor(props: NotificationServiceProps) {
    super('div', {
      ...props,
      attr: {
        ...props.attr,
        class: 'notification',
      },
    });
  }

  public addNotification(message: string, type: 'success' | 'error' | 'warning') {
    const id = v4();
    const notification = new Notification(message, type, id);

    if (this.props.notifications) {
      this.props.notifications = [...this.props.notifications, notification];
    } else {
      this.props.notifications = [notification];
    }

    setTimeout(() => {
      this.removeNotification(id);
    }, 4000);
  }

  private removeNotification(id: string) {
    this.props.notifications = this.props.notifications!.filter(
      (notification) => notification.id !== id,
    );
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const notifications = new NotificationService({});
