import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GetFoldersServiceService } from '../get-folders-service.service';

@Component({
  selector: 'edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css'],
  // providers: [GetFoldersServiceService]
})
export class EditMenuComponent implements OnInit {
  SelectedType: any;
  Selected = -1;
  closeResult: string;
  Loading = true;
  constructor(private forldesService:GetFoldersServiceService) {
    forldesService.loading.subscribe(isLoading => {
      this.Loading = isLoading
      console.log(this.Loading)
    
    })
   }
  Action;
  ngOnInit() {
  }

  SelectedItem(button){
    console.log(button)
    this.Selected = button.Selected;
    if(this.Selected == -1) {
      this.SelectedType = null;
    }else{
      this.SelectedType = {Type:button.Type,IdNumber: button.IdNumber}; 
    }
    
   
    // if (button == this.Selected ){
    //   this.Selected = -1;
    // }else if(this.Selected == -1){
    //   this.Selected = button;
    // }else{
    //   alert("replace " +   this.Selected +  " with " + button )
    // }
  }

  DoAction(action){

    this.Action = action;
    
  }




}
