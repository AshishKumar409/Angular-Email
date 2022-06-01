import { Component, Input, OnChanges, OnInit  } from '@angular/core';
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
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent implements OnChanges{
  showModal=false
  @Input() email:any

  constructor(private emailService:EmailService) { }

  ngOnChanges(): void {
    const text = this.email.text.replace(/\n/gi,'\n> ')
    this.email={
      ...this.email,
      from:this.email.to,
      to:this.email.from,
      subject:`RE:${this.email.subject}`,
      text: `\n\n\n-------${this.email.from} wrote:\n>${text}`
    }
  }

  onSubmit(email:Email){
     this.emailService.sendEmail(email).subscribe(()=>{
       this.showModal = false
     })
  }

}
