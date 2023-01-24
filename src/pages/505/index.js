import tpl from './index.hbs';
import link from '../../components/link';

document.getElementById('root').innerHTML = tpl({
  link: link('../index.html', 'Назад к чатам', 'error-page__link'),
});
