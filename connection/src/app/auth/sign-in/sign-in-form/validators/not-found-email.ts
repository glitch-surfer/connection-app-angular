import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignInService } from '../../sign-in.service';

export const notFoundEmailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (SignInService.notFoundEmail !== '' && control.value === SignInService.notFoundEmail) {
      return {
        notFound: `Email: ${control.value} not found`,
      };
    }

    return null;
  };
};
