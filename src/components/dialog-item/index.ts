import tpl from './dialog-item.hbs';
import { Block } from '../../core/Block';

interface DialogItemProps {
  avatarUrl: string
  addClass?: string
  attr?: Record<string, string>
}

export class DialogItem extends Block<DialogItemProps> {
  constructor(props: DialogItemProps) {
    super('li', {
      ...props,
      attr: {
        class: `dialog-item ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
