import EventBus from './EventBus';

export default class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;

  private _meta: { tagName: string, props: any };

  private props: any;

  private eventBus: () => EventBus;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  init() {
    this._createResources();
  }

  _componentDidMount() {
    this.componentDidMount({});
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: any) {
    console.log(oldProps);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    console.log(oldProps, newProps);
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element(): HTMLElement {
    return this._element!;
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element!.innerHTML = block;
    this._addEvents();
  }

  // Может переопределять пользователь, необязательно трогать
  render() {
    return this.props.text;
  }

  getContent(): HTMLElement {
    return this.element;
  }

  _makePropsProxy(props: any) {
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    const element = document.createElement(tagName);
    element.textContent = this.props.text;

    return element;
  }

  _removeEvents() {
    const { events }: Record<string, () => void> = this.props as any;

    if (!events || !this._element) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _addEvents() {
    const { events }: Record<string, () => void> = this.props as any;

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
