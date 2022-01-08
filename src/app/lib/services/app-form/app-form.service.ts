import {Injectable} from '@angular/core';
import {AppForm} from "./app-form";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable()
export class AppFormService implements AppForm {
  private form!: FormGroup;

  constructor() {
    this.prepareForm()
  }

  get(): FormGroup {
    return this.form;
  }

  get drinks(): FormControl {
    return this.form.get('drinks') as FormControl;
  }

  get snacks(): FormControl {
    return this.form.get('snacks') as FormControl;
  }

  private prepareForm() {
    this.form = new FormGroup({
      drinks: new FormControl({value: null, disabled: false}),
      snacks: new FormControl({
        value: {
          id: 5,
          name: 'Krążki cebulowe',
          description: 'Domowe krążki cebulowe to niezwykle prosta i super pyszna przekąska na każdą okazję.'
        },
        disabled: false
      })
    })
  }
}
