import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { GetFoldersServiceService } from '../../../get-folders-service.service';

@Component({
  selector: 'setup-folder',
  templateUrl: './setup-folder.component.html',
  styleUrls: ['./setup-folder.component.css'],
  providers:[]
})
export class SetupFolderComponent implements OnInit {
  @Input() IdNumber;
  @Output() Close = new EventEmitter<string>();
  FolderName:string;
  FolderColor = "#008000";
  FolderPosition ;
  number=0;

  constructor(private forldesService:GetFoldersServiceService) {

   
  }

  ngOnInit() {
  }

  SaveNewFolder(){
    this.forldesService.NewFolder(this.FolderName,this.FolderColor)
    this.number++;
    this.Close.emit("Saved"+this.number);
  }

  UpdateFolder(){
    this.forldesService.UpdateFolder(this.IdNumber,this.FolderName,this.FolderColor,this.FolderPosition)
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
      console.log(updateFolder)
      this.FolderName = updateFolder.Text;
      this.FolderColor = updateFolder.Color;
      this.FolderPosition = updateFolder.Position;
    } 
  }

}
