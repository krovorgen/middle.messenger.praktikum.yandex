import tpl from './index.hbs';
import emptyChooseMessage from '../../components/empty-choose-message';

document.getElementById('root').innerHTML = tpl({
  emptyChooseMessage: emptyChooseMessage(),
});
