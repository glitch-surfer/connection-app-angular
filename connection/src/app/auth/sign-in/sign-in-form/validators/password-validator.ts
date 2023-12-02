import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

const isIncludeUpperAndLowerCase = (value: string): boolean =>
  /[a-z]/.test(value) && /[A-Z]/.test(value);

const isIncludeNumbersAndLetters = (value: string): boolean =>
  /[0-9]/.test(value) && /[a-zA-Z]/.test(value);

const isIncludedSymbol = (value: string): boolean =>
  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value?.length < 8) {
      return {
        weakPassword: 'Password must be at least 8 characters long',
      };
    }

    if (!isIncludeUpperAndLowerCase(control.value)) {
      return {
        weakPassword: 'Password must contain at least one uppercase and one lowercase letter',
      };
    }

    if (!isIncludeNumbersAndLetters(control.value)) {
      return {
        weakPassword: 'Password must contain at least one number and one letter',
      };
    }

    if (!isIncludedSymbol(control.value)) {
      return {
        weakPassword: 'Password must contain at least one symbol',
      };
    }

    return null;
  };
};
