import { Component, OnInit } from '@angular/core';
import { GetFoldersServiceService } from '../get-folders-service.service';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  // providers:  [GetFoldersServiceService]
})
export class OrdersComponent implements OnInit {

  Orders = [];
  number = 0;

  constructor(private forldesService:GetFoldersServiceService) { }

  ngOnInit() {
  }

  OrederUpdate(item){
    if(item.OrderItemID == 0){
      item.OrderItemID = this.GetId();
    }
    this.Orders.push(item);

    console.log(this.Orders);
  }

  GetId(){
    this.number++;
    return this.number;
  }

}
