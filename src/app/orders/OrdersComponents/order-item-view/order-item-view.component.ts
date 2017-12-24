import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'order-item-view',
  templateUrl: './order-item-view.component.html',
  styleUrls: ['./order-item-view.component.css']
})
export class OrderItemViewComponent implements OnInit {

  @Input() Tosafot;

  constructor() { }

  ngOnInit() {
  }

}
