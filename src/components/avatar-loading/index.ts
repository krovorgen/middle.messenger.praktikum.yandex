import tpl from './avatar-loading.hbs';
import { Block } from '../../core/Block';
import { Button } from '../button';

interface AvatarLoadingProps {
  addClass?: string
  attr?: Record<string, string>
  button?: Block
}

export class AvatarLoading extends Block<AvatarLoadingProps> {
  constructor(props: AvatarLoadingProps) {
    super('div', {
      ...props,
      button: new Button({ size: 'sm', variant: 'primary', text: 'Сохранить' }),
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
