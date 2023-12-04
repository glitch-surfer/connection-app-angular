import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { SignUpService } from '../../sign-up.service';

export const duplicatedEmailValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (SignUpService.duplicatedEmail.includes(control.value)) {
      return {
        duplicatedEmail: `Email: ${control.value} is already in use`,
      };
    }

    return null;
  };
};
