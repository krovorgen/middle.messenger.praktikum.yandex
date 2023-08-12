import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface FormSendMessageProps extends ComponentPropsType {
  inputPattern: string
  inputTitle: string
  events: {
    submit: (e: SubmitEvent) => void
    uploadFile: () => void
  }
}

export class FormSendMessage extends Block<FormSendMessageProps> {
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
