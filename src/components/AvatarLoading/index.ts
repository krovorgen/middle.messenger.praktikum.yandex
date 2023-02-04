import tpl from './avatar-loading.hbs';
import { Block } from '../../core/Block';
import { Button } from '../Button';

interface LoadImgProps {
  addClass?: string
  attr?: Record<string, string>
  button?: Block
}

export class LoadImg extends Block<LoadImgProps> {
  constructor(props: LoadImgProps) {
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
