import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUser } from '../validators/unique-user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ], [this.uniqueUser.validate]),
    
    password: new FormControl('', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),]),

    passwordConfirmation: new FormControl('', [Validators.required,
    Validators.minLength(4),
    Validators.maxLength(20),]),
  },
  // [
  //   MatchPassword.validate
  // ]
  {validators:[this.matchPassword.validate]}
  )

  constructor(
    private matchPassword: MatchPassword, 
    private uniqueUser: UniqueUser,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.emailForm.invalid){
      return
    }

    // console.log(this.emailForm.value)
    this.authService.signup(this.emailForm.value).subscribe({
      next:()=>{
        this.router.navigateByUrl('/inbox')
      },
      error:(err)=>{
        
      if(err.status===0){
        this.emailForm.setErrors({noConnection:true})
      }else{
        this.emailForm.setErrors({unKnownError:true})
      }
      }
    })
  }

}
// 