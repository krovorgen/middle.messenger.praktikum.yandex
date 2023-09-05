import { Block } from './Block';

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root === null) {
    throw new Error(`Не найден корневой элемент ${query}`);
  }
  const content = block.getContent();

  // для TypeError: Failed to execute 'appendChild' on 'Node': parameter 1 is not of type 'Node'.
  if (content && root) {
    root.innerHTML = '';
    root.appendChild(content);
    block.dispatchComponentDidMount();
  }
  return root;
}
