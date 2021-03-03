import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperGlobalService {

  constructor(
    private toastr: ToastrService
  ) { }

  validateFormApi(data: any) {
    try {
      if (!data.state) {
        let allErrorsValidation = '';
        if (Object.values(data.data).length == 0) throw data.msj;
        let errors = data.data.errors;
        for (let index = 0; index < errors.length; index++) {
          allErrorsValidation += ' (' + (index + 1) + ') ' + errors[index].msg + '.';
        }
        throw allErrorsValidation;
      } else {
        return true;
      }
    } catch (e) {
      this.toastr.error(e, '¡Formulario Invalido!');
      return false;
    }
  }
}
