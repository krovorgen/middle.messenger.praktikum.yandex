import tpl from './form-control.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface FormControlProps extends ComponentPropsType {
  type: string
  name: string
  placeholder: string
  events?: {
    blur: (el: Event) => void
    focus: (el: Event) => void
  }
  errorMsg?: string
  pattern?: string
  inputTitle?: string
}

export class FormControl extends Block<FormControlProps> {
  _addEvents() {
    const input = this.element.querySelector('input');
    if (input && this.props.events?.blur) {
      input!.addEventListener('blur', this.props.events.blur);
    }
    if (input && this.props.events?.focus) {
      input!.addEventListener('focus', this.props.events.focus);
    }
    super._addEvents();
  }

  _removeEvents() {
    const input = this.element.querySelector('input');
    if (input && this.props.events?.blur) {
      input!.removeEventListener('blur', this.props.events.blur);
    }
    if (input && this.props.events?.focus) {
      input!.removeEventListener('focus', this.props.events.focus);
    }
    super._removeEvents();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
