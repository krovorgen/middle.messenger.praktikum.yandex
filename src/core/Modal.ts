export class Modal {
  modal: HTMLElement = document.querySelector('.modal')!;

  modalCross: HTMLElement = document.querySelector('.modal__close')!;

  modalContent: HTMLElement = document.querySelector('.modal__content')!;

  constructor() {
    this.modalCross.addEventListener('click', () => {
      this.hide();
    });
  }

  show(content: HTMLElement) {
    this.modal.style.display = 'flex';
    this.modalContent.append(content);
  }

  hide() {
    this.modal.style.display = 'none';
    this.modalContent.innerHTML = '';
  }
}
