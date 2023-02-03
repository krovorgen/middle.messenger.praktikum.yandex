import tpl from './form-control.hbs';
import { Block } from '../../core/Block';

interface FormControlProps {
  type: string
  name: string
  placeholder: string
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

  render() {
    return this.compile(tpl, this.props);
  }
}
