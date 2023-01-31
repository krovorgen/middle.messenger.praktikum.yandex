import tpl from './button.hbs';
import { Block } from '../../utils/Block';

interface ButtonProps {
  text: string
  addClass?: string
  size: 'sm'
  variant: 'primary'
  center?: boolean
  attr?: Record<string, string>
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', {
      ...props,
      attr: {
        class: `btn btn--${props.size} btn--${props.variant} ${props.center ? 'btn--center' : ''} ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
