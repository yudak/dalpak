import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.css']
})
export class ButtonMenuComponent implements OnInit {

  @Input() Type:string ;
  @Input() Position: number;
  @Input() Color;
  @Output() IClicked = new EventEmitter<number>()
  @Input() IsSetupPosition = false;
  @Input() Text:string;
  @Input() Price: number;
  @Input() IsClicked = false;
  @Input() Folder ;
  

  constructor() { }

  ngOnInit() {
  }

  ClickEvent(){
    this.IsClicked = !this.IsClicked;
    this.IClicked.emit(this.Position);
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes)
    if(changes && changes.Position ){
      if(  changes.Position.currentValue !=changes.Position.previousValue){
        this.IsClicked = false;
      }
    }
  }

}
