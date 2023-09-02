import tpl from './messages-box.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { EmptyChooseMessage } from '../EmptyChooseMessage';
import { FormSendMessage } from '../FormSendMessage';
import { withStore } from '../../../core/Store';
import { MessagesList } from '../MessageList';

interface MessagesBoxProps extends ComponentPropsType {
  selectedChat: number | null
}

class MessagesBoxComponent extends Block<MessagesBoxProps> {
  init() {
    this._children.emptyChooseMessage = new EmptyChooseMessage({});
    this._children.messagesList = new MessagesList({});
    this._children.formSendMessage = new FormSendMessage({});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
const withSelectedChat = withStore((state) => ({ selectedChat: state.selectedChat }));
export const MessagesBox = withSelectedChat(MessagesBoxComponent);
