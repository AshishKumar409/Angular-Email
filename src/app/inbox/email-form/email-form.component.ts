import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface Email {
  id: string,
  subject: string,
  text: string,
  to: string,
  from: string,
  html: string
}

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: any
  @Output() emailSubmit = new EventEmitter()


  emailForm = new FormGroup({
   to:new FormControl('',[Validators.required,Validators.email]),
   from:new FormControl({value:'',disabled:true}),
   text:new FormControl('',[Validators.required]),
    subject: new FormControl('', [Validators.required]),
  })
   
  

  constructor() { }

  ngOnInit(): void {
    let {subject,from,to,text} = this.email

    this.emailForm.setValue({to,from,text,subject})
    // console.log(this.emailForm.value)
  }

  onClick(){
    if(this.emailForm.invalid){
      return
    }

    this.emailSubmit.emit(this.emailForm.value)
  }

}
