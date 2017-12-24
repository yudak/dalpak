import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input, Inject } from '@angular/core';
import { Folders } from '../FolderClass';
import { GetFoldersServiceService } from '../../../get-folders-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'menu-bord',
  templateUrl: './bord.component.html',
  styleUrls: ['./bord.component.css'],
  providers: []
})


export class BordComponent implements OnInit {
   forldes:Folders[] = []
   forldesNew:Folders[] = []
   IsSetupPosition = false;
   Selected = -1;
   path = [];

   @Input() Action:string;
   @Output() NowClick1 = new EventEmitter<any>();
  constructor(private forldesService:GetFoldersServiceService,public dialog: MatDialog) {forldesService.SetCurrentFolderId(0)
    this.path.push({Perant:0 ,FolderNmae:"ראשי"})
    forldesService.items.subscribe(folders => {
      this.forldes = folders;
      console.log(folders)
    })
   }

   getFolders(parent:number):void{
    //  this.forldesService.Refresh(parent);
    //  this.forldes = this.forldesService.GetFolders(parent);
    //  console.log(this.forldes)
   }

   GoTo(parent){
     console.log(parent)
     var found = false;
     var newpath = [];
     this.path.forEach(element => {
       if(!found){
        if(element.Perant != parent){
          newpath.push(element)
        } else{
         found = true;
         newpath.push(element)
         this.path = newpath;
         this.forldesService.SetCurrentFolderId(parent)
         this.forldes = this.forldesService.GetFolders(this.forldesService.currentPerantId)
         this.clear_clicks();
        }
       }

       
     });
   }

  ngOnInit() {
    this.getFolders(0);
  }
  NowClick(event) {
    
    console.log("1) event: " +  event + " Selected: " + this.Selected);

    if (event == this.Selected ){
      this.Selected = -1;
      this.IsSetupPosition = false;
      ;
      this.clear_clicks();
    }else if(this.Selected == -1){
      if(this.forldes[event].Type != "Empty"){
        this.Selected = event;
        this.IsSetupPosition = true;
        
      }

    }else{
      var tmp: Folders;
      console.log("2.0) event: " +  event + " Selected: " + this.Selected);
      tmp = this.forldes[event];
      this.forldes[event] = this.forldes[this.Selected];
      this.forldes[this.Selected] = tmp;
      this.forldes[event].IsClicked = false;
      this.forldes[this.Selected].IsClicked = false;
      this.forldes[event].Position = event;
      this.forldes[this.Selected].Position = this.Selected;
      this.clear_clicks();

    }
    console.log("2) event: " +  event + " Selected: " + this.Selected);
    // this.NowClick1.emit(this.Selected)
    this.NowClick1.emit({Selected:this.Selected,Type: this.forldes[event].Type,IdNumber: this.forldes[event].IdNumber})
  }  

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    if ((""+changes.Action.currentValue).includes("InsertToFolder")){
      this.path.push({Perant:this.forldes[this.Selected].IdNumber ,FolderNmae:this.forldes[this.Selected].Text})
      this.forldesService.SetCurrentFolderId(this.forldes[this.Selected].IdNumber)
      //this.forldes = this.forldesService.GetFolders(this.forldesService.currentPerantId)
      this.clear_clicks();
    }else if((""+changes.Action.currentValue).includes("DeleteFolder")){
      this.forldes = this.forldesService.DeleteFolder(this.forldes[this.Selected].IdNumber  );
      this.IsSetupPosition = false;
      this.Selected = -1;
      this.clear_clicks();
    }else if((""+changes.Action.currentValue).includes("DeleteItem")){
     // this.forldes = this.forldesService.DeleteItem(this.forldes[this.Selected].IdNumber  );
      this.IsSetupPosition = false;
      this.Selected = -1;
      this.clear_clicks();
    }else if((""+changes.Action.currentValue).includes("EditFolder")){
      // var tmp:Folders = new Folders()
      // tmp.Type = "Empty"
      // this.forldes[this.Selected]= tmp;
      this.IsSetupPosition = false;
    }else if((""+changes.Action.currentValue).includes("NewFolder")){
      
    }else if((""+changes.Action.currentValue).includes("Refresh")){
      console.log(this.forldes)
     // this.forldes = this.forldesService.GetFolders(this.forldesService.currentPerantId)
      this.clear_clicks();
      console.log(this.forldes)
    }
  }
  clear_clicks(){
   // this.forldes = this.forldesService.GetFolders(this.forldesService.currentPerantId)
    // this.forldes.forEach(f => {
    //   f.IsClicked = false;
    // })
    
    this.IsSetupPosition = false;
    this.Selected = -1; 
    // this. NowClick1.emit(this.Selected);
    this.NowClick1.emit({Selected:this.Selected,Type: null,IdNumber:null})
  }

  GetData(){
    this.forldesService.GetData();
  }

}


