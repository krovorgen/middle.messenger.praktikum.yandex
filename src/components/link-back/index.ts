import tpl from './link-back.hbs';
import arrow from '../../../static/icons/circle-arrow-left.svg';
import { Block } from '../../utils/Block';

interface LinkBackProps {
  attr?: Record<string, string>
  addClass?: string
  arrowImgPath?: string
}

export class LinkBack extends Block<LinkBackProps> {
  constructor(props: LinkBackProps) {
    super('a', {
      ...props,
      arrowImgPath: arrow,
      attr: {
        class: `link-back ${props.addClass ?? ''}`,
        href: '/',
        ...props.attr,
      },
    });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
