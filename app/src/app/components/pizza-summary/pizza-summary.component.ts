import { FormArray } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { Prices } from 'src/app/models/PizzaInfo';

@Component({
  selector: 'app-pizza-summary',
  templateUrl: './pizza-summary.component.html',
  styleUrls: ['./pizza-summary.component.scss']
})
export class PizzaSummaryComponent implements OnInit {
  @Input()
  pizzasForm: FormArray;

  @Input()
  prices: Prices;

  PizzaNames = {
    size: {
      large: 'Large Pizza',
      medium: 'Medium Pizza',
      small: 'Small Pizza'
    }
  };

  constructor() { }

  ngOnInit() {
    console.log(this.pizzasForm.value);
  }

}
