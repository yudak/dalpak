import { Component, OnInit, EventEmitter, Output, SimpleChanges, Input } from '@angular/core';
import { GetFoldersServiceService } from '../../../get-folders-service.service';
import { Folders } from '../FolderClass';

@Component({
  selector: 'setup-item',
  templateUrl: './setup-item.component.html',
  styleUrls: ['./setup-item.component.css']
})
export class SetupItemComponent implements OnInit {
  Tosafot: Folders[] = [];

  @Input() IdNumber;
  @Output() Close = new EventEmitter<string>();
  number = 0;
  ItemPraice = 0;
  ItemName;
  ItemType;

  TosefetPraice = 0;
  TosefetName;

  constructor(private forldesService:GetFoldersServiceService) {
   
   }

  ngOnInit() {
    this.getTosefet();
  }

  SaveNewItem(){
    this.forldesService.NewItem(this.ItemName,this.ItemPraice)
    this.number++;
    this.Close.emit("Saved"+this.number);
  }

  UpdateItem(){
    this.forldesService.UpdateItem(this.IdNumber,this.ItemName,this.ItemPraice)
    this.number++;
    this.Close.emit("Saved"+this.number);
  }

  CloseMe(){
    this.number++;
    this.Close.next("Exit"+this.number);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.IdNumber && this.IdNumber){
      var updateFolder = this.forldesService.getFolderFromID(this.IdNumber);
      this.ItemName = updateFolder.Text;
      this.ItemPraice = updateFolder.Price;
    } 
  }

  SaveNewTosefet(){
    this.forldesService.NewTosefet(this.IdNumber,this.TosefetName,this.TosefetPraice);
    this.getTosefet();
  }

  getTosefet(){
    this.Tosafot = this.forldesService.GetTosefet(this.IdNumber)
    console.log(this.Tosafot)
  }



}
