import tpl from './link.hbs';

export default (
  href,
  text,
  addClass = '',
  size = 'sm',
  variant = 'primary',
  target = '_self',
) => tpl({
  href,
  text,
  size,
  variant,
  target,
  addClass,
});
