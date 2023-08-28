import tpl from './messages-box.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { EmptyChooseMessage } from '../EmptyChooseMessage';
import { DateMessages } from '../DateMessages';
import { Message } from '../Message';
import { ContentMessage } from '../ContentMessage';
import { FormSendMessage } from '../FormSendMessage';
import { checkRegexp } from '../../../core/CheckRegexp';
import { checkValidityInput } from '../../../core/checkValidityInput';
import { withStore } from '../../../core/Store';

interface MessagesBoxProps extends ComponentPropsType {
  selectedChat: number | null
}

class MessagesBoxComponent extends Block<MessagesBoxProps> {
  init() {
    this._children.emptyChooseMessage = new EmptyChooseMessage({});
    this._children.dateMessages = new DateMessages({ text: '17 Января' });
    this._children.myMessage = new Message({ text: '17 Января', time: '17:00', myMessage: true });
    this._children.opponentMessage = new Message({ text: '17 Января', time: '17:00' });
    this._children.contentMessage = new ContentMessage({
      imgPath: 'https://ethnomir.ru/upload/medialibrary/a8a/otkuda_vzyalis_khaski_1.jpg',
      time: '17:00',
      myMessage: true,
    });
    this._children.formSendMessage = new FormSendMessage({
      inputPattern: checkRegexp.message.pattern,
      inputTitle: checkRegexp.message.msg,
      events: {
        submit(e) {
          e.preventDefault();
          e.stopPropagation();

          const { message: { value: message } } = e.target! as typeof e.target & {
            message: { value: string };
          };

          ((e.target! as HTMLFormElement).querySelectorAll('input') as NodeListOf<HTMLInputElement>).forEach(checkValidityInput);
          console.log(message);
        },
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
const withSelectedChat = withStore((state) => ({ selectedChat: state.selectedChat }));
export const MessagesBox = withSelectedChat(MessagesBoxComponent);
