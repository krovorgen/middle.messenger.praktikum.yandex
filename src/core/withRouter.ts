import { Block } from './Block';
import { Router } from './Route';

export function withRouter(Component: typeof Block<any>) {
  type Props = typeof Component extends typeof Block<infer P> ? P : any;

  return class WithRouter extends Component {
    constructor(props: Props & PropsWithRouter) {
      super(Component.name, { ...props, router: Router });
    }
  };
}

export interface PropsWithRouter {
  router: typeof Router;
}
