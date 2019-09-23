import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('É necessário informar um campo.');
      }

      if (!formControl.root || !(formControl.root as FormGroup).controls) {
        return null;
      }

      const field = (formControl.root as FormGroup).get(otherField);

      if (!field) {
        throw new Error('É necessário informar um campo válido.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo: otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config = {
      required: `${fieldName} é obrigatório.`,
      minlength: `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
      maxlength: `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
      cepInvalido: 'CEP inválido.',
      emailInvalido: 'Email já cadastrado!',
      equalsTo: 'Campos não são iguais',
      pattern: 'Campo inválido'
    };

    return config[validatorName];
  }


  static cpfCnpjValidator(control: FormControl) {
    const cpfCnpj = control.value;
    if (cpfCnpj && cpfCnpj !== '') {
      const validCpfCnpj = /^(([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2}))$/;
      return validCpfCnpj.test(cpfCnpj) ? null : { cpfCnpjInvalid: true };
    }
    return null;
  }

  static telephoneValidator(control: FormControl) {
    const telephone = control.value;
    if (telephone && telephone !== '') {
      const validTelephone = /^((?:\()[0-9]{2}(?:\))\s?[9]{0,1}\s?[0-9]{4}(?:-)[0-9]{4})$/;
      return validTelephone.test(telephone) ? null : { telephoneInvalid: true };
    }
    return null;
  }

  static emailValidator(control: FormControl) {
    const email = control.value;
    if (email && email !== '') {
      const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
      return validEmail.test(email) ? null : { emailInvalid: true };
    }
    return null;
  }
}
