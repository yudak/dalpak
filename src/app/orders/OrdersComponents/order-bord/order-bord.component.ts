import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Folders } from '../../../edit-menu/EditMenuComponents/FolderClass';
import { MatDialog } from '@angular/material';
import { GetFoldersServiceService } from '../../../get-folders-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'order-bord',
  templateUrl: './order-bord.component.html',
  styleUrls: ['./order-bord.component.css']
})
export class OrderBordComponent implements OnInit {
  closeResult: string;

  forldes:Folders[] = []
  IsSetupPosition = false;
  Selected = -1;
  path = [];
  OrderItem;

  @Input() Action:string;
  @Output() NowClick1 = new EventEmitter<any>();
  @Output() OrderItemSaved = new EventEmitter<any>();
  constructor(private forldesService:GetFoldersServiceService,public dialog: MatDialog,private modalService: NgbModal) { 
    this.path.push({Perant:0 ,FolderNmae:"ראשי"})
    forldesService.items.subscribe(folders => {
      this.forldes = folders;
      console.log(folders)
    })
  }

  ngOnInit() {
    this.getFolders(0);
  }

  getFolders(parent:number):void{
   // this.forldes = this.forldesService.GetFolders(parent);
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
        this.forldes = this.forldesService.GetFolders(parent)
       }
      }
      this.getFolders(0);
      
    });
  }
  NowClick(event){
    
    var folder = this.forldesService.getFolderFromID(event)
    console.log(folder)
    if(folder.Type == "Folder"){
      this.path.push({Perant:folder.IdNumber ,FolderNmae:folder.Text})
      this.forldes = this.forldesService.GetFolders(event)
    }
    if(folder.Type == "Item"){
      var ItemTosafot = [];
      this.forldesService.GetTosefet(folder.IdNumber).forEach(tosefet => {
        ItemTosafot.push({Selected:false,Tosefet: tosefet}) 
      })
      this.OrderItem = {OrderItemID: 0,Item: folder,Tosafot:ItemTosafot};
      console.log(this.OrderItem)
    }
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // this.Action.emit("Refresh");
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult)
      // this.Action.emit("Refresh");

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

  Saved(){
    this.OrderItemSaved.emit(this.OrderItem)
  }

}
