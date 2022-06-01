import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { switchMap } from 'rxjs';
// import { EmailService } from '../email.service';

interface Email {
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}


@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  email:Email

  constructor(private route:ActivatedRoute) {
    // console.log(this.route.snapshot.data['email']);
    this.email = route.snapshot.data['email']

    route.data.subscribe(({email})=>{
      // console.log(email);
      this.email = email
    })
   }

  ngOnInit(): void {
  // this.route.params.pipe(
  //   switchMap(({id})=>this.emailService.getEmail(id))
  // ).subscribe((response)=>{
  //   this.email = response
  // })

  }

}
