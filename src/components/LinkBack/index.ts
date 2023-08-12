import tpl from './link-back.hbs';
import arrow from '../../../static/icons/circle-arrow-left.svg';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';

interface LinkBackProps extends ComponentPropsType {
  arrowImgPath?: string
}

export class LinkBack extends Block<LinkBackProps> {
  constructor(props: LinkBackProps) {
    super({
      ...props,
      arrowImgPath: arrow,
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
