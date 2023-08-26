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
import { LoadImg } from '../../components/AvatarLoading';
import { ComponentPropsType } from '../../types/componentPropsType';
import { modal } from '../../core/Modal';

interface HomePageProps extends ComponentPropsType {
  isSelectedMessage: boolean
}

class HomePageComponent extends Block<HomePageProps> {
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
        uploadFile() {
          modal.show(
            new LoadImg({}).getContent(),
          );
        },
      },
    });
    this._children.dialogItem = new DialogItem({
      avatarUrl: notAvatarImagePath,
    });

    this.props.isSelectedMessage = false;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const HomePage = HomePageComponent;
