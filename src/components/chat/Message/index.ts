import { Block } from '../../../core/Block';
import tpl from './message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface MessageProps extends ComponentPropsType {
  text: string
  time: string
  myMessage?: boolean
}

export class Message extends Block<MessageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
