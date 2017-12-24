import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetFoldersServiceService } from '../../../get-folders-service.service';

@Component({
  selector: 'setup-tosefet',
  templateUrl: './setup-tosefet.component.html',
  styleUrls: ['./setup-tosefet.component.css']
})
export class SetupTosefetComponent implements OnInit {

  @Input() Tosefet;
  @Output() Delete = new EventEmitter<string>() ;
  number=0;
  constructor(private forldesService:GetFoldersServiceService) { }

  ngOnInit() {
  }

  DeleteTosefet(){
    this.forldesService.DeleteTosefet(this.Tosefet.IdNumber)  
    this.number++;
    this.Delete.emit("Delete"+this.number)
  }

}
