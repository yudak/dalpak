import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit {
  IdNumber: any;
  Selected: any;
  closeResult: string;
  @Output() Action = new EventEmitter<String>()
  @Input() SelectedType;
  
  count = 0;
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  SetAction(action){
    this.count++;
    console.log(action + this.count)
    this.Action.emit(action+this.count);
    
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.Action.emit("Refresh");
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.Action.emit("Refresh");

    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if(changes.SelectedType && changes.SelectedType.currentValue){
      this.Selected = changes.SelectedType.currentValue.Type;
      this.IdNumber = changes.SelectedType.currentValue.IdNumber; 
      console.log(this.Selected + " "+ this.IdNumber)  
    }else if(changes.SelectedType && changes.SelectedType.currentValue == null){
      this.Selected = null;
      this.IdNumber = null; 
      console.log(this.Selected + " "+ this.IdNumber) 
    }

  }

  
 


}
