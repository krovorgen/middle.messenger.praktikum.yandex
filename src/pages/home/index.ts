import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { EmptyChooseMessage } from '../../components/chat/EmptyChooseMessage';
import { DialogItem } from '../../components/chat/DialogItem';
import notAvatarImagePath from '../../../static/icons/not-avatar.svg';
import { DateMessages } from '../../components/chat/DateMessages';
import { Message } from '../../components/chat/Message';
import { ContentMessage } from '../../components/chat/ContentMessage';
import { FormSendMessage } from '../../components/chat/FormSendMessage';
import { checkRegexp } from '../../core/CheckRegexp';
import { checkValidityInput } from '../../core/checkValidityInput';
import { Modal } from '../../core/Modal';
import { LoadImg } from '../../components/AvatarLoading';
import { ComponentPropsType } from '../../types/componentPropsType';

interface HomePageProps extends ComponentPropsType {
  emptyChooseMessage: Block
  dialogItem: Block
  dateMessages: Block
  myMessage: Block
  opponentMessage: Block
  contentMessage: Block
  formSendMessage: Block
  isSelectedMessage: boolean
}

class HomePage extends Block<HomePageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}

const emptyChooseMessage = new EmptyChooseMessage({});
const dateMessages = new DateMessages({ text: '17 Января' });
const myMessage = new Message({ text: '17 Января', time: '17:00', myMessage: true });
const opponentMessage = new Message({ text: '17 Января', time: '17:00' });
const contentMessage = new ContentMessage({
  imgPath: 'https://ethnomir.ru/upload/medialibrary/a8a/otkuda_vzyalis_khaski_1.jpg',
  time: '17:00',
  myMessage: true,
});

const formSendMessage = new FormSendMessage({
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
    uploadFile() {
      new Modal().show(
        new LoadImg({}).getContent(),
      );
    },
  },
});
const dialogItem = new DialogItem({
  avatarUrl: notAvatarImagePath,
});

export const homePage = new HomePage({
  emptyChooseMessage,
  dialogItem,
  dateMessages,
  myMessage,
  opponentMessage,
  contentMessage,
  formSendMessage,
  isSelectedMessage: true,
});
