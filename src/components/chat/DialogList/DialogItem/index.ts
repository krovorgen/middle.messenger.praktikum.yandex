import tpl from './dialog-item.hbs';
import { Block } from '../../../../core/Block';
import { ComponentPropsType } from '../../../../types/componentPropsType';
import { IChats, withStore } from '../../../../core/Store';

interface DialogItemProps extends ComponentPropsType, IChats {
  selectedChat: IChats
}

class DialogItemComponent extends Block<DialogItemProps> {
  init() {
  }

  render() {
    return this.compile(tpl, { ...this.props, isSelected: this.props.id === this.props.selectedChat?.id });
  }
}

const withSelectedChat = withStore((state) => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }));
export const DialogItem = withSelectedChat(DialogItemComponent);
