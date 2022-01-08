import {Component, Inject, OnInit} from '@angular/core';
import {FormConfiguration} from "../../models/form-configuration";
import {AppForm} from "../../services/app-form/app-form";
import {FORM_CONFIGURATION} from "../../config/form-configuration";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  constructor(public appForm: AppForm, @Inject(FORM_CONFIGURATION) public formConfiguration: FormConfiguration) {
  }

  ngOnInit() {
    this.appForm.drinks.valueChanges.subscribe(value => {
      console.log(value);
    })
  }
}
