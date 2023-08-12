import tpl from './avatar-loading.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface LoadImgProps extends ComponentPropsType {
}

export class LoadImg extends Block<LoadImgProps> {
  render() {
    return this.compile(tpl, this.props);
  }
}
