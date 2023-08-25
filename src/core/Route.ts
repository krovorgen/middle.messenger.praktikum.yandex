import { renderDom } from './renderDom';
import { Block } from './Block';
import { RoutePath } from './RoutePath';

export interface BlockConstructable<P extends Record<string, any> = any> {
  new(props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

export class Route {
  _block: Block | null = null;

  constructor(
    private _pathname: string,
    private readonly _blockClass: BlockConstructable,
    private readonly _rootQuery: string,
  ) {
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass({});

      renderDom(this._rootQuery, this._block);
    }
  }
}

export class Router {
  private static __instance: Router;

  private routes: Route[] = [];

  private _currentRoute: Route | null = null;

  private history = window.history;

  constructor(private readonly _rootQuery: string) {
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this._rootQuery);

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    });

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      this.render404();
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  render404() {
    const route = this.getRoute(RoutePath.page404);
    if (!route) {
      throw new Error('Неверный url страницы ошибки');
    }
    this.go(RoutePath.page404);
  }
}

export const routerApp = new Router('#app');
