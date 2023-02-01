import { Block } from './Block';

export function renderDom(query: string, block: Block) {
  const root = document.querySelector(query)!;
  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();
  return root;
}
