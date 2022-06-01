import { Component, OnInit,Output,EventEmitter,ElementRef } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Output() close = new EventEmitter()

  constructor(private el:ElementRef) { }

  ngOnInit(): void {
    document.body.append(this.el.nativeElement)
  }

  ngOnDestroy(){
    this.el.nativeElement.remove()
  }


  onClick(){
    this.close.emit()
  }

}
