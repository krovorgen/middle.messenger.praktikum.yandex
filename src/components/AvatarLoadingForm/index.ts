import tpl from './avatar-loading-form.hbs';
import { Block } from '../../core/Block';
import { ComponentPropsType } from '../../types/componentPropsType';
import { userController } from '../../controllers/user.controller';
import { modal } from '../../core/Modal';

interface AvatarLoadingFormProps extends ComponentPropsType {
}

export class AvatarLoadingForm extends Block<AvatarLoadingFormProps> {
  init() {
    this.props.events = {
      submit: async (e: SubmitEvent) => {
        e.preventDefault();

        const inputFile: HTMLInputElement = (e.target! as HTMLFormElement).querySelector('input[type="file"]')!;
        await userController.updateAvatar(inputFile.files![0]);
        modal.hide();
      },
    };
  }

  render() {
    return this.compile(tpl, this.props);
  }
}
