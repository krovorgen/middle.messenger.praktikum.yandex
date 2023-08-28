import { Block } from '../../../core/Block';
import tpl from './message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';
import { IMessages } from '../../../core/Store';

interface MessageProps extends ComponentPropsType, IMessages {
  myMessage?: boolean
}

export class Message extends Block<MessageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
