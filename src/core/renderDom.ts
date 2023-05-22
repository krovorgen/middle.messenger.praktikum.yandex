import { Block } from './Block';

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    throw new Error(`Не найден корневой элемент ${query}`);
  }
  root.innerHTML = '';
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
