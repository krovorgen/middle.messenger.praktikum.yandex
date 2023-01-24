import tpl from './link.hbs';

export default (
  href: string,
  text: string,
  addClass: string = '',
  size: 'sm' | 'md' = 'sm',
  variant: 'primary' | 'accent' = 'primary',
  target: '_self' | '_blank' = '_self',
) => tpl({
  href,
  text,
  size,
  variant,
  target,
  addClass,
});
