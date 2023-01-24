import tpl from './form-control.hbs';

export default (name, placeholder, errorMsg, type = 'text', addClass = '') => tpl({
  name, placeholder, errorMsg, type, addClass,
});
