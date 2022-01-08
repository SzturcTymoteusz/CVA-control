import { InjectionToken } from '@angular/core';
import {FormConfiguration} from "../models/form-configuration";
import {formConfiguration} from "./form-configuration.config";

export const FORM_CONFIGURATION = new InjectionToken<FormConfiguration>('Form Configurations', {
  providedIn: 'root',
  factory: () => formConfiguration,
});
