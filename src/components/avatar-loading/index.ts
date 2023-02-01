import tpl from './avatar-loading.hbs';
import { Block } from '../../core/Block';

export default (button: any) => tpl({ button });

interface AvatarLoadingProps {
  addClass?: string
  attr?: Record<string, string>
}

export class AvatarLoading extends Block<AvatarLoadingProps> {
  constructor(props: AvatarLoadingProps) {
    super('div', {
      ...props,
      attr: {
        class: `avatar-loading ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
