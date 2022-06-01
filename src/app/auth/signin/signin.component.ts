import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  })

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.authForm.invalid) {
      if (this.authForm.value.username == '' && this.authForm.value.username == ''){
        this.authForm.setErrors({ emptyUser: true, emptyPassword: true })
      }
      return
    }

    this.authService.signin(this.authForm.value).subscribe({
      next: () => {
         this.router.navigateByUrl('/inbox')
      },
      error: (err) => {
        // console.log(err)
        if (err.error.username && err.error.password) {
          // console.log("Both Wrong")
          this.authForm.setErrors({ noUser: true, noPassword: true })
        } else if (err.error.password) {
          // console.log("Password Wrong")
          this.authForm.setErrors({ noPassword: true })
        } else if (err.status === 0) {
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({ unKnownError: true })
        }
      }
    })

  }

}
