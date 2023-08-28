import { IMessages, store } from '../core/Store';
import WS, { WSTransportEvents } from '../core/WS';

class MessagesController {
  private sockets: Record<number, WS> = {};

  async connect(id: number, token: string) {
    if (this.sockets[id]) {
      return;
    }

    const userId = store.getState().user!.id;

    const websocket = new WS(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

    this.sockets[id] = websocket;

    await websocket.connect();

    this.subscribe(websocket, id);
    this.getOldMessages(id);
    console.log(this.sockets);
  }

  sendMessage(id: number, message: string) {
    const socket = this.sockets[id];

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({
      type: 'message',
      content: message,
    });
  }

  getOldMessages(id: number) {
    const socket = this.sockets[id];

    if (!socket) {
      throw new Error(`Chat ${id} is not connected`);
    }

    socket.send({ type: 'get old', content: '0' });
  }

  closeAll() {
    Object.values(this.sockets).forEach((socket) => socket.close());
  }

  getMessages(id: number, messages: IMessages | IMessages[]) {
    let messagesToAdd: IMessages[] = [];

    if (Array.isArray(messages)) {
      messagesToAdd = messages.reverse();
    } else {
      messagesToAdd.push(messages);
    }

    const currentMessages = (store.getState().messages || {})[id] || [];

    messagesToAdd = [...currentMessages, ...messagesToAdd];

    store.set(`messages.${id}`, messagesToAdd);
  }

  onClose(id: number) {
    delete this.sockets[id];
  }

  subscribe(transport: WS, id: number) {
    transport.on(WSTransportEvents.Message, (message: IMessages | IMessages[]) => this.getMessages(id, message));
    transport.on(WSTransportEvents.Close, () => this.onClose(id));
  }
}

export const messagesController = new MessagesController();
