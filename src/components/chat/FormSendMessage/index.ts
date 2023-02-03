import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';

interface FormSendMessageProps {
  inputPattern: string
  inputTitle: string
  addClass?: string
  attr?: Record<string, string>
  events: {
    submit: (e: SubmitEvent) => void
    uploadFile: () => void
  }
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
    const uploadFileBtn: HTMLButtonElement = form.querySelector('.form-send-message__file')!;

    uploadFileBtn.addEventListener('click', this.props.events.uploadFile);

    super._addEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
