import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject,tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootURL = 'https:/api.angular-email.com'
  signedin$ = new BehaviorSubject<any>(null);
  username=''

  constructor(private http:HttpClient) { }

  checkUser(username:string){
    return this.http.post<{ available: boolean }>(`${this.rootURL
}/auth/username`, {
      username: username
    })
  }

  signup(credentials:{username:string,password:string,passwordConfirmation:string}){
    return this.http.post<{ username: string }>(`${this.rootURL}/auth/signup`,credentials).pipe(
      tap(({username})=>{
        this.signedin$.next(true)
        this.username = username
      })
    )
  }


  checkSignIn(){
    return this.http.get<{authenticated:boolean,username:string}>(`${this.rootURL}/auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated)
        this.username = username
      })
    )
  }

  getUser(){
    return this.http.get<{authenticated:boolean,username:string}>(`${this.rootURL}/auth/signedin`)
  }

  signout(){
    return this.http.post(`${this.rootURL}/auth/signout`,{}).pipe(
      tap(() => this.signedin$.next(false))
    )
  }

  signin(credentials:{username:string,password:string}){
    return this.http.post<{ username: string
}>(`${this.rootURL}/auth/signin`, credentials).pipe(
      tap(({username})=>{
        this.signedin$.next(true)
        this.username = username
      })
    )
  }
}
