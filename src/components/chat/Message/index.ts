import { Block } from '../../../core/Block';
import tpl from './message.hbs';

interface MessageProps {
  text: string
  time: string
  myMessage?: boolean
  addClass?: string
  attr?: Record<string, string>
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super('div', {
      ...props,
      attr: {
        class: `message ${props.myMessage ? 'message--my' : 'message--opponent'} ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
