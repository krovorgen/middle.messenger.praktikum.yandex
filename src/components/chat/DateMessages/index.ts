import tpl from './date-messages.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface DateMessagesProps extends ComponentPropsType {
  text: string
}

export class DateMessages extends Block<DateMessagesProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
