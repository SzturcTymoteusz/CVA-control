import {Injectable} from "@angular/core";
import {AppFormService} from "./app-form.service";
import {FormControl, FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root',
  useClass: AppFormService
})
export abstract class AppForm {
  abstract get(): FormGroup;

  abstract get drinks(): FormControl;

  abstract get snacks(): FormControl;
}
