import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from 'rxjs/operators'
import { AuthService } from '../auth.service'


@Injectable({
  providedIn: 'root'
})
export class UniqueUser implements AsyncValidator {
  
  constructor(private authService:AuthService) { }

  validate = (control: AbstractControl): any => {
    let { value } = control
    // console.log(this)
    // console.log({ value });
    // console.log(this.http)
    return this.authService.checkUser(value).pipe(
      map(() => null),
      catchError((err): any => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true })
        } else {
          return of({ noConnection: true })
        }
      })
    )
  }
}
