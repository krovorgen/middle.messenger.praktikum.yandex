import tpl from './empty-choose-message.hbs';
import { Block } from '../../../core/Block';

interface EmptyChooseMessageProps {
  addClass?: string
  attr?: Record<string, string>
}

export class EmptyChooseMessage extends Block<EmptyChooseMessageProps> {
  constructor(props: EmptyChooseMessageProps) {
    super('div', {
      ...props,
      attr: {
        class: `empty-choose-message ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
