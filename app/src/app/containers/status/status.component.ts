import { Orders } from './../../models/Orders';
import { Component, OnInit } from '@angular/core';
import { StatusService } from './status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  orders: any;

  constructor(private statusService: StatusService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.statusService.getOrders().subscribe(
     (response: any) => {
        this.orders = response.orders as Orders[];
      },
      error => {
      this.orders=[];
      }
    );
  }

changeStatus(item) {
   this.statusService.setStatus(item).subscribe(
     (response: any ) => {
        this.orders = response.orders as Orders[];
     },
     error => {
      this.orders=[];
     }
   );
 }

}
