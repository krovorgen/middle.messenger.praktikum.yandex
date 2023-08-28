import tpl from './button.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface ButtonProps extends ComponentPropsType {
  text?: string
  size: 'sm'
  variant: 'primary' | 'ghost'
  center?: boolean
  block?: boolean
  svg?: boolean
  iconPath?: string
}

export class Button extends Block<ButtonProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
