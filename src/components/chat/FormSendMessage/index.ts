import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';

interface FormSendMessageProps {
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
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const {
        message: { value: message },
      } = e.currentTarget! as typeof e.currentTarget & {
        message: { value: string };
      };

      console.log(message);
    });
    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
