import { notifications } from '../components/Notification';
import {
  AddUserToChatDTOType,
  chatApi,
  CreateChatDTOType,
  DeleteChatDTOType,
  DeleteUserFromChatDTOType,
} from '../api/chat.api';
import { IChats, store } from '../core/Store';
import { messagesController } from './messages.controller';

class ChatController {
  private readonly api: typeof chatApi;

  constructor() {
    this.api = chatApi;
  }

  getChats = async () => {
    try {
      const chats = await this.api.getChats();

      (chats as IChats[]).map(async (chat) => {
        const token = await this.getToken(chat.id);

        await messagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  getToken = async (id: number) => {
    const data = (await this.api.getToken(id) as { token: string });
    return data.token;
  };

  createChat = async (data: CreateChatDTOType) => {
    try {
      await this.api.createChat(data);
      notifications.addNotification('Чат создан', 'success');
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  deleteChat = async (data: DeleteChatDTOType) => {
    try {
      await this.api.deleteChat(data);
      notifications.addNotification('Чат удалён', 'success');
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  addUserToChat = async (data: AddUserToChatDTOType) => {
    try {
      await this.api.addUserToChat(data);
      notifications.addNotification('Пользователь добавлен в чат', 'success');
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };

  deleteUserFromChat = async (data: DeleteUserFromChatDTOType) => {
    try {
      await this.api.deleteUserFromChat(data);
      notifications.addNotification('Пользователь удалён из чата', 'success');
    } catch (error: any) {
      notifications.addNotification(error.reason, 'error');
    }
  };
}

export const chatController = new ChatController();
