import { Block } from './Block';
import { EventBus } from './EventBus';
import { set } from './Set';
import { isEqual } from './isEqual';

export enum StoreEvents {
  Updated = 'updated',
}

export interface IUser {
  avatar: null | string
  display_name: string | null
  email: string | null
  first_name: string | null
  id: number | null
  login: string | null
  phone: string | null
  second_name: string | null
}

export interface IChats {
  id: number,
  title: string,
  avatar: null | string,
  created_by: number,
  unread_count: number,
  last_message: LastMessageType
}

type LastMessageType = {
  user: {
    first_name: string,
    second_name: string,
    display_name: null | string,
    login: string,
    avatar: null | string
  },
  time: string,
  content: string,
  id: number
};

interface State {
  selectedChat: number | null;
  user?: IUser
  chats?: IChats[];
}

export class Store extends EventBus {
  private state: State = {
    selectedChat: null,
  };

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();

// @ts-ignore
window.store = store;

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(previousState, newState)) {
            this.setProps({ ...newState as any });
          }

          previousState = newState;
        });
      }
    };
  };
}
