import tpl from './form-control.hbs';
import { Block } from '../../core/Block';

interface FormControlProps {
  type: string
  name: string
  placeholder: string
  events?: {
    blur: (el: Event) => void
    focus: (el: Event) => void
  }
  errorMsg?: string
  attr?: Record<string, string>
  addClass?: string
  pattern?: string
  inputTitle?: string
}

export class FormControl extends Block<FormControlProps> {
  constructor(props: FormControlProps) {
    super('label', {
      ...props,
      attr: {
        class: `form-control ${props.addClass ?? ''} ${props.errorMsg ? 'form-control--error' : ''}`,
        ...props.attr,
      },
    });
  }

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
