import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignInService } from '../../sign-in.service';
import { SignIn } from '../../../../api/model/sign-in';

const isIncorrectCredentials = (value: SignIn): boolean =>
  SignInService.incorrectCredentials.some(
    (credentials) => credentials.email === value.email && credentials.password === value.password,
  );

export const incorrectCredentialsValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      SignInService.incorrectCredentials.length &&
      isIncorrectCredentials(control.value as SignIn)
    ) {
      return {
        incorrectCreds: `Email or password is incorrect`,
      };
    }

    return null;
  };
};
