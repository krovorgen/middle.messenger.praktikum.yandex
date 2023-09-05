/* eslint-disable @typescript-eslint/no-unused-expressions */

import { expect } from 'chai';
import { Block } from './Block';
import { ComponentPropsType } from '../types/componentPropsType';

describe('Block', () => {
  let component: Block<ComponentPropsType>;
  let root;
  class Button extends Block<ComponentPropsType> {
    render() {
      return this.compile(() => '<button>CLICK ME</button>', this.props);
    }
  }

  before(() => {
    root = document.querySelector('#app')!;
    component = new Button({
      attr: {
        'data-test-id': '123',
        type: 'submit',
      },
      events: {
        click: () => {
          console.log('123');
        },
      },
    });
    const content = component.getContent();
    if (content) {
      root.appendChild(content);
    }
  });

  it('Компонент кнопка отрендерился', () => {
    const button: HTMLButtonElement = document.querySelector('button')!;
    expect(button).to.not.undefined;
  });

  it('Attr добавились', () => {
    const button: HTMLButtonElement = document.querySelector('button')!;
    expect(button.dataset.testId).to.eq('123');
    expect(button.type).to.eq('submit');
  });

  it('Событие клика навешено', () => {
    const button: HTMLButtonElement = document.querySelector('button')!;
    expect('onclick' in button).to.true;
  });

  it('Пропсы корректно добавляются', () => {
    component.setProps({
      addClass: 'button--sm',
    });
    expect(component.getProps.addClass).to.eq('button--sm');
  });

  it('Пропсы корректно перезаписываются', () => {
    component.setProps({
      addClass: 'button--sm',
    });
    component.setProps({
      addClass: 'button--md',
    });
    expect(component.getProps.addClass).to.eq('button--md');
  });
});
