import { EventBus } from './EventBus';
import { Block } from './Block';
import { set } from './Set';

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  selectedChat?: number;
}

export class Store extends EventBus {
  private state: any = {};

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// @ts-ignore
window.store = store;

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(tagName: string, props: Omit<P, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super(tagName, { ...(props as P), ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
