import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, EMPTY, Observable } from 'rxjs';
import { EmailService } from './email.service';

interface Email {
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email> {

  constructor(private emailService:EmailService,private router:Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Email | Observable<Email> | Promise<Email> {
    // console.log(route);
    let {id} = route.params
    return this.emailService.getEmail(id).pipe(
      catchError((err)=>{
        this.router.navigateByUrl('/inbox/not-found')
        return EMPTY
      })
    )
  }
}
