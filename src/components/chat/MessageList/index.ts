import tpl from './messages-list.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { Message } from '../Message';
import { IMessages, withStore } from '../../../core/Store';
import { formatDate } from '../../../core/formatDate';

interface MessagesListProps extends ComponentPropsType {
  selectedChat: number | null;
  messages: IMessages[];
  userId: number;
}

class MessagesListComponent extends Block<MessagesListProps> {
  init() {
    this._children.messages = this.getContentMessages(this.props);
  }

  componentDidUpdate(_oldProps: MessagesListProps, newProps: MessagesListProps): boolean {
    this._children.messages = this.getContentMessages(newProps);

    return true;
  }

  getContentMessages(props: MessagesListProps) {
    return props.messages.map((data) => new Message(
      {
        ...data,
        myMessage: this.props.userId === data.user_id,
        time: formatDate(data.time),
      },
    ));
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withSelectedChatMessages = withStore((state) => {
  const { selectedChat } = state;
  if (!selectedChat) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state!.user!.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChat] || [],
    selectedChat: state.selectedChat,
    userId: state!.user!.id,
  };
});

export const MessagesList = withSelectedChatMessages(MessagesListComponent);
