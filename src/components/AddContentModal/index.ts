import tpl from './index.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface AddContentModalProps extends ComponentPropsType {
  title: string;
  inputs: Block[];
  buttonSubmit: Block
}

export class AddContentModal extends Block<AddContentModalProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
