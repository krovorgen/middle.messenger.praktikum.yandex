import tpl from './date-messages.hbs';
import { Block } from '../../../core/Block';

interface DateMessagesProps {
  text: string
  addClass?: string
  attr?: Record<string, string>
}

export class DateMessages extends Block<DateMessagesProps> {
  constructor(props: DateMessagesProps) {
    super('div', {
      ...props,
      attr: {
        class: `date-messages ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
