import tpl from './dialog-list.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { IChats, store, withStore } from '../../../core/Store';
import { DialogItem } from './DialogItem';
import notAvatarImagePath from '../../../../static/icons/not-avatar.svg';
import { formatDate } from '../../../core/formatDate';

interface DialogListProps extends ComponentPropsType {
  chats: IChats[];
}

class DialogListComponent extends Block<DialogListProps> {
  init() {
    this._children.dialogs = this.getContentDialogs(this.props);
  }

  componentDidUpdate(_oldProps: DialogListProps, newProps: DialogListProps): boolean {
    this._children.dialogs = this.getContentDialogs(newProps);

    return true;
  }

  getContentDialogs(props: DialogListProps) {
    return props.chats.map((el) => (
      new DialogItem(
        {
          ...el,
          avatar: el.avatar ?? notAvatarImagePath,
          last_message: {
            ...el.last_message,
            time: el.last_message ? formatDate(el.last_message.time) : '',
          },
          events: {
            click: () => {
              store.set('selectedChat', el.id);
            },
          },
        },
      )
    ));
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = withStore((state) => ({ chats: state.chats || [] }));

export const DialogList = withUser(DialogListComponent);
