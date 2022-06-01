import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EmailService } from '../email.service';
interface Email {
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css']
})
export class EmailCreateComponent implements OnInit {

  showModal=false
  email:Email

  constructor(private authService:AuthService,private emailService:EmailService) { 
    this.email = {
      id:'',
      from: `${authService.username}@angular-email.com`,
      to:'',
      text:'',
      html:'',
      subject:''
    }
    
    
    
  }

  ngOnInit(): void {
 
  }

  onSubmit(email:Email){
    this.emailService.sendEmail(email).subscribe(()=>{
      this.showModal = false
    })
  }

}
