import { HttpClient } from '../core/HttpClient';

export type CreateChatDTOType = {
  title: string
};

export type DeleteChatDTOType = {
  chatId: string
};

export type AddUserToChatDTOType = {
  users: string[]
  chatId: string
};

export type DeleteUserFromChatDTOType = {
  users: string[]
  chatId: string
};

class ChatApi {
  private readonly instance = new HttpClient();

  getChats() {
    return this.instance.get('/chats');
  }

  getToken(id: number) {
    return this.instance.post(`/chats/token/${id}`);
  }

  createChat(data: CreateChatDTOType) {
    return this.instance.post('/chats', data);
  }

  deleteChat(data: DeleteChatDTOType) {
    return this.instance.delete('/chats', data);
  }

  addUserToChat(data: AddUserToChatDTOType) {
    return this.instance.put('/chats/users', data);
  }

  deleteUserFromChat(data: DeleteUserFromChatDTOType) {
    return this.instance.delete('/chats/users', data);
  }
}

export const chatApi = new ChatApi();
