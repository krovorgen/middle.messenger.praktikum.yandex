import tpl from './form-control.hbs';

export default (
  name: string,
  placeholder: string,
  errorMsg: string | null,
  type: string = 'text',
  addClass: string = '',
) => tpl({
  name, placeholder, errorMsg, type, addClass,
});
