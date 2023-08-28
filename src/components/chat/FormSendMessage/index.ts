import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface FormSendMessageProps extends ComponentPropsType {
  inputPattern: string
  inputTitle: string
  events: {
    submit: (e: SubmitEvent) => void
  }
}

export class FormSendMessage extends Block<FormSendMessageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
