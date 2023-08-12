import tpl from './edited-label.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface EditedLabelProps extends ComponentPropsType {
  text: string
  editable: boolean
  inputPattern?: string
  inputTitle?: string
  type?: string
  name?: string
  value: string
  events?: {
    blur: (el: Event) => void
    focus: (el: Event) => void
  }
}

export class EditedLabel extends Block<EditedLabelProps> {
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
