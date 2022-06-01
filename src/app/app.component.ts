import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import {BehaviorSubject} from 'rxjs'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'emailclient';
  // signedin = false
  signedin$: BehaviorSubject<any>;
  constructor(private authService:AuthService){
    this.signedin$ = this.authService.signedin$
  }

  ngOnInit(): void {

    // this.authService.signedin$.subscribe((signedin)=>{
    //   this.signedin = signedin
    // })
    

    this.authService.checkSignIn().subscribe()

    
  }
}
