import { Block } from '../../../core/Block';
import tpl from './content-message.hbs';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface ContentMessageProps extends ComponentPropsType {
  time: string
  imgPath: string
  myMessage?: boolean
}

export class ContentMessage extends Block<ContentMessageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
