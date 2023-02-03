import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';
import { notifications } from '../../Notification';
import { Modal } from '../../../core/Modal';
import { LoadImg } from '../../AvatarLoading';

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
    const uploadFileBtn: HTMLButtonElement = form.querySelector('.form-send-message__file')!;

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
        notifications.addNotification(`Поле ${formInput.name} заполнено верно`, 'success');
      }

      console.log(message);
    });

    uploadFileBtn.addEventListener('click', () => {
      new Modal().show(
        new LoadImg({}).getContent(),
      );
    });

    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
