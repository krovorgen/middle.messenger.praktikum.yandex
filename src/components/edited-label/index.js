import tpl from './edited-label.hbs';

export default (text, value, name, editable = false, type = 'text', addClass = '') => tpl({
  text, value, name, editable, type, addClass,
});
