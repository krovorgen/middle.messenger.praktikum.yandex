import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';
import { modal } from '../../core/Modal';
import { Button } from '../../components/Button';
import { routerApp } from '../../core/Route';
import { RoutePath } from '../../core/RoutePath';
import addIcon from '../../../static/icons/add.svg';
import deleteIcon from '../../../static/icons/delete.svg';
import chatIcon from '../../../static/icons/chat.svg';
import profileIcon from '../../../static/icons/profile.svg';
import deleteChatIcon from '../../../static/icons/delete-chat.svg';
import { AddContentModal } from '../../components/AddContentModal';
import { FormControl } from '../../components/FormControl';
import { chatController } from '../../controllers/chat.controller';
import { DialogList } from '../../components/chat/DialogList';
import { MessagesBox } from '../../components/chat/MessagesBox';

interface HomePageProps extends ComponentPropsType {
}

class HomePageComponent extends Block<HomePageProps> {
  init() {
    this._children.dialogItem = new DialogList({});
    this._children.profileLink = new Button({
      size: 'sm',
      variant: 'ghost',
      svg: true,
      iconPath: profileIcon,
      block: true,
      events: {
        click: () => {
          routerApp.go(RoutePath.profile);
        },
      },
    });
    this._children.addUserBtn = new Button({
      size: 'sm',
      variant: 'ghost',
      svg: true,
      iconPath: addIcon,
      block: true,
      attr: {
        title: 'Добавить пользователя в чат',
      },
      events: {
        click: () => {
          modal.show(
            new AddContentModal({
              title: 'Добавить пользователя в чат',
              buttonSubmit: new Button({
                text: 'Добавить',
                attr: {
                  type: 'submit',
                },
                block: true,
                size: 'sm',
                variant: 'primary',
              }),
              inputs: [
                new FormControl({
                  type: 'text',
                  name: 'users',
                  placeholder: 'ID Пользователя',
                }),
                new FormControl({
                  type: 'text',
                  name: 'chatId',
                  placeholder: 'ID чата',
                }),
              ],
              events: {
                submit: async (e: SubmitEvent) => {
                  e.preventDefault();

                  const {
                    users: { value: users },
                    chatId: { value: chatId },
                  } = e.target! as typeof e.target & {
                    users: { value: string };
                    chatId: { value: string };
                  };

                  await chatController.addUserToChat({ users: [users], chatId });

                  modal.hide();
                },
              },
            }).getContent(),
          );
        },
      },
    });
    this._children.deleteUserBtn = new Button({
      size: 'sm',
      variant: 'ghost',
      svg: true,
      iconPath: deleteIcon,
      block: true,
      attr: {
        title: 'Удалить пользователя из чата',
      },
      events: {
        click: () => {
          modal.show(
            new AddContentModal({
              title: 'Удалить пользователя из чата',
              buttonSubmit: new Button({
                text: 'Удалить',
                attr: {
                  type: 'submit',
                },
                block: true,
                size: 'sm',
                variant: 'primary',
              }),
              inputs: [
                new FormControl({
                  type: 'text',
                  name: 'users',
                  placeholder: 'ID Пользователя',
                }),
                new FormControl({
                  type: 'text',
                  name: 'chatId',
                  placeholder: 'ID чата',
                }),
              ],
              events: {
                submit: async (e: SubmitEvent) => {
                  e.preventDefault();

                  const {
                    users: { value: users },
                    chatId: { value: chatId },
                  } = e.target! as typeof e.target & {
                    users: { value: string };
                    chatId: { value: string };
                  };

                  await chatController.deleteUserFromChat({ users: [users], chatId });

                  modal.hide();
                },
              },
            }).getContent(),
          );
        },
      },
    });
    this._children.addChatBtn = new Button({
      size: 'sm',
      variant: 'ghost',
      svg: true,
      iconPath: chatIcon,
      block: true,
      attr: {
        title: 'Добавить чат',
      },
      events: {
        click: () => {
          modal.show(
            new AddContentModal({
              title: 'Добавить чат',
              buttonSubmit: new Button({
                text: 'Добавить',
                attr: {
                  type: 'submit',
                },
                block: true,
                size: 'sm',
                variant: 'primary',
              }),
              inputs: [new FormControl({
                type: 'text',
                name: 'title',
                placeholder: 'Название чата',
                attr: {
                  required: 'required',
                },
              })],
              events: {
                submit: async (e: SubmitEvent) => {
                  e.preventDefault();

                  const {
                    title: { value: title },
                  } = e.target! as typeof e.target & {
                    title: { value: string };
                  };

                  await chatController.createChat({ title });
                  await chatController.getChats();

                  modal.hide();
                },
              },
            }).getContent(),
          );
        },
      },
    });
    this._children.deleteChatBtn = new Button({
      size: 'sm',
      variant: 'ghost',
      svg: true,
      iconPath: deleteChatIcon,
      block: true,
      attr: {
        title: 'Удалить чат',
      },
      events: {
        click: () => {
          modal.show(
            new AddContentModal({
              title: 'Удалить чат',
              buttonSubmit: new Button({
                text: 'Удалить',
                attr: {
                  type: 'submit',
                },
                block: true,
                size: 'sm',
                variant: 'primary',
              }),
              inputs: [
                new FormControl({
                  type: 'text',
                  name: 'chatId',
                  placeholder: 'ID чата',
                }),
              ],
              events: {
                submit: async (e: SubmitEvent) => {
                  e.preventDefault();

                  const {
                    chatId: { value: chatId },
                  } = e.target! as typeof e.target & {
                    chatId: { value: string };
                  };

                  await chatController.deleteChat({ chatId });
                  await chatController.getChats();

                  modal.hide();
                },
              },
            }).getContent(),
          );
        },
      },
    });

    this._children.messagesBox = new MessagesBox({});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export const HomePage = HomePageComponent;
