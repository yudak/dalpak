import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.css'],
  animations: [
    trigger('clickedState',[
      state('default',style({
        border: '2px solid white'
      })),
      state('clicked',style({
        border: '2px solid red'
      })),
      transition('default => clicked',animate('500ms 20ms ease-in')),
      transition('clicked => default',animate('50ms 20ms ease-in'))
    ])
  ]
})
export class ButtonMenuComponent implements OnInit {
  
  @Output() IClicked = new EventEmitter<number>()
  @Output() ClickedID = new EventEmitter<number>()
  // @Input() Type:string ;
   @Input() Position: number;
  // @Input() Color;
  // @Input() IsSetupPosition = false;
  // @Input() Text:string;
  // @Input() Price: number;
  // @Input() IsClicked = false;
  @Input() Folder ;
  @Input() IsSetupPosition = false;
  clickedState = "default";

  constructor() { }

  ngOnInit() {
  }

  ClickEvent(){
    console.log(this.Folder)
    if (this.Folder.Type != "Empty" || this.IsSetupPosition) {
      this.Folder.IsClicked = !this.Folder.IsClicked;
      if (!this.Folder.IsClicked){
        this.clickedState = "default"
      }else{
        this.clickedState = "clicked"
      }
      this.IClicked.emit(this.Folder.Position);
      this.ClickedID.emit(this.Folder.Position);
    }

  }

  ngOnChanges(changes: SimpleChanges) {
     //console.log(changes)
    if(changes && changes.Position ){
      if(  changes.Position.currentValue !=changes.Position.previousValue){
        this.Folder.IsClicked = false;
        this.clickedState = "default"
      }
    }
  }

}
