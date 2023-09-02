import tpl from './empty-choose-message.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface EmptyChooseMessageProps extends ComponentPropsType {
}

export class EmptyChooseMessage extends Block<EmptyChooseMessageProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
