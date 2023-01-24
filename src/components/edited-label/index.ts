import tpl from './edited-label.hbs';

export default (
  text: string,
  value: string,
  name: string,
  editable: boolean = false,
  type: string = 'text',
  addClass: string = '',
) => tpl({
  text, value, name, editable, type, addClass,
});
