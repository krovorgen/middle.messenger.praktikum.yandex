import tpl from './dialog-item.hbs';
import { Block } from '../../../core/Block';
import { ComponentPropsType } from '../../../types/componentPropsType';

interface DialogItemProps extends ComponentPropsType {
  avatarUrl: string
}

export class DialogItem extends Block<DialogItemProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
