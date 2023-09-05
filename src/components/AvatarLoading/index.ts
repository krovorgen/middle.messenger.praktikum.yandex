import tpl from './avatar-loading.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';
import { AvatarLoadingForm } from '../AvatarLoadingForm';

interface LoadImgProps extends ComponentPropsType {
}

export class LoadImg extends Block<LoadImgProps> {
  init() {
    this._children.avatarLoadingForm = new AvatarLoadingForm({});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
