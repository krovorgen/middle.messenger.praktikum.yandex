import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';
import { notifications } from '../../Notification';

interface FormSendMessageProps {
  inputPattern: string
  inputTitle: string
  addClass?: string
  attr?: Record<string, string>
}

export class FormSendMessage extends Block<FormSendMessageProps> {
  constructor(props: FormSendMessageProps) {
    super('div', {
      ...props,
      attr: {
        class: `form-send-message ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  _addEvents() {
    const form: HTMLFormElement = this.element.querySelector('.form-send-message__form')!;
    const formInput: HTMLInputElement = form.querySelector('input')!;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        message: { value: message },
      } = e.currentTarget! as typeof e.currentTarget & {
        message: { value: string };
      };

      if (!formInput.checkValidity()) {
        notifications.addNotification(formInput.title, 'error');
      } else {
        notifications.addNotification(`Поле ${formInput.placeholder} заполнено верно`, 'success');
      }

      console.log(message);
    });
    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
