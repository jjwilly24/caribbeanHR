import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[compare]',
  providers: [{provide: NG_VALIDATORS, useExisting: CompareValidatorDirective, multi: true}]
})
export class CompareValidatorDirective implements Validator {
@Input('compare') controlNameToCompare: string;
  
  validate(c: AbstractControl): ValidationErrors | null {
    if(c.value === null || c.value.length === 0){
      return null; 
    }
    const ControlToCompare = c.root.get(this.controlNameToCompare);
    if (ControlToCompare){
      const subscription: Subscription = ControlToCompare.valueChanges.subscribe(()=>{
        c.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return ControlToCompare && ControlToCompare.value !== c.value ? {'compare': true} : null;
  }
}
