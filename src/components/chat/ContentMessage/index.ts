import { Block } from '../../../core/Block';
import tpl from './content-message.hbs';

interface ContentMessageProps {
  time: string
  imgPath: string
  myMessage?: boolean
  addClass?: string
  attr?: Record<string, string>
}

export class ContentMessage extends Block<ContentMessageProps> {
  constructor(props: ContentMessageProps) {
    super('div', {
      ...props,
      attr: {
        class: `content-message ${props.myMessage ? 'content-message--my' : 'content-message--opponent'} ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
