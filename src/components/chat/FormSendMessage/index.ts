import { Block } from '../../../core/Block';
import tpl from './form-send-message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { withStore } from '../../../core/Store';
import { messagesController } from '../../../controllers/messages.controller';

interface FormSendMessageProps extends ComponentPropsType {
  selectedChat: number
}

class FormSendMessageComponent extends Block<FormSendMessageProps> {
  init() {
    this.props.events = {
      submit: (e: SubmitEvent) => {
        e.preventDefault();

        const { message: { value: message } } = e.target! as typeof e.target & {
          message: { value: string };
        };
        messagesController.sendMessage(this.props.selectedChat, message);
        (e.target as HTMLFormElement).reset();
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withSelectedChat = withStore((state) => ({ selectedChat: state.selectedChat }));

export const FormSendMessage = withSelectedChat(FormSendMessageComponent);
