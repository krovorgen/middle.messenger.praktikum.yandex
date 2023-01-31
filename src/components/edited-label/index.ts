import tpl from './edited-label.hbs';
import { Block } from '../../utils/Block';

interface EditedLabelProps {
  text: string
  editable: boolean
  type?: string
  name?: string
  value: string
  addClass?: string
  attr?: Record<string, string>
}

export class EditedLabel extends Block<EditedLabelProps> {
  constructor(props: EditedLabelProps) {
    super('label', {
      ...props,
      attr: {
        class: `edited-label ${props.addClass ?? ''}`,
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
