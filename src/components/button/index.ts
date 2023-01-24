import tpl from './button.hbs';

export default (
  text: string,
  type: 'button' | 'submit',
  addClass: string = '',
  size: 'sm' = 'sm',
  variant: 'primary' = 'primary',
  center: boolean = false,
) => tpl({
  text,
  type,
  size,
  variant,
  addClass,
  center,
});
