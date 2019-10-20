import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Orders } from 'src/app/models/Orders';
import _ from 'lodash';

@Component({
  selector: 'app-status-orders',
  templateUrl: './status-orders.component.html',
  styleUrls: ['./status-orders.component.scss']
})
export class StatusOrdersComponent implements OnInit {
  @Input()
  orders: Orders[];

  @Output()
  changeStatus =  new EventEmitter<any>();

  totalItems: number;

  status = {
    CANCEL: 'cencelled',
    ACCEPT: 'accepted',
    COMPLETE: 'completed',
    PENDING: 'pending',
    IN_TRANSIT: 'in-transit'
  };

  countStatus = {
    completed: 0,
    status: 0,
    pending: 0,
    cancelled: 0,
    'in-transit': 0,
    accepted: 0
  };

  constructor() { }

  ngOnInit() {
    this.totalItems = this.orders.length;
  }

  changeOrderStatus(index, status) {
    this.changeStatus.emit({ id: index, status});
  }

  statusBarCalculator(status) {
    if (status === this.status.PENDING ) {
      this.countStatus[this.status.ACCEPT] = this.howManyMatch(this.status.ACCEPT);
      this.countStatus[status] = this.howManyMatch(status);
      const pendingPercent =  this.calculateTotalPercent(this.countStatus[status] + this.countStatus[this.status.ACCEPT] );
      return pendingPercent;
    }
    this.countStatus[status] = this.howManyMatch(status);
    const percent =  this.calculateTotalPercent(this.countStatus[status]);
    return percent;
  }

  calculateTotalPercent(value) {
    return ((value / this.totalItems) * 100).toFixed(2);
  }

  howManyMatch(status) {
    const count = _.groupBy(this.orders, (order) => {
      return order.status === status;
    });
    if (count.true) {
      return count.true.length;
    }
    return 0;
  }



}
