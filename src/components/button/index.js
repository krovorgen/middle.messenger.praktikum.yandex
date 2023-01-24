import tpl from './button.hbs';

export default (
  text,
  type = 'button',
  addClass = '',
  size = 'sm',
  variant = 'primary',
  center = false,
) => tpl({
  text,
  type,
  size,
  variant,
  addClass,
  center,
});
