import tpl from './index.hbs';
import { renderDom } from '../../core/renderDom';
import { Block } from '../../core/Block';
import { EmptyChooseMessage } from '../../components/chat/EmptyChooseMessage';
import { DialogItem } from '../../components/chat/DialogItem';
import notAvatarImagePath from '../../../static/icons/not-avatar.svg';
import { DateMessages } from '../../components/chat/DateMessages';
import { Message } from '../../components/chat/Message';
import { ContentMessage } from '../../components/chat/ContentMessage';

interface HomePageProps {
  addClass?: string
  emptyChooseMessage: Block
  dialogItem: Block
  dateMessages: Block
  myMessage: Block
  opponentMessage: Block
  contentMessage: Block
  attr?: Record<string, string>
  isSelectedMessage: boolean
}

class HomePage extends Block<HomePageProps> {
  constructor(props: HomePageProps) {
    super('div', {
      ...props,
      attr: {
        class: `column ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

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
const dialogItem = new DialogItem({
  avatarUrl: notAvatarImagePath,
});

window.addEventListener('DOMContentLoaded', () => {
  const homePage = new HomePage({
    emptyChooseMessage,
    dialogItem,
    dateMessages,
    myMessage,
    opponentMessage,
    contentMessage,
    isSelectedMessage: true,
  });

  renderDom('#app', homePage);
});
