import { Prices } from 'src/app/models/PizzaInfo';
import { PizzaInfo } from './../../models/PizzaInfo';
import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-pizza-form',
  templateUrl: './pizza-form.component.html',
  styleUrls: ['./pizza-form.component.scss']
})
export class PizzaFormComponent implements OnInit {
  @Input()
  pizzasForm: FormArray;

  @Input()
  pizzaInfo: PizzaInfo;
  
  @Input()
  toppingsSelected;
  
  @Output()
  add = new EventEmitter<any>();

  @Output()
  submitOrder = new EventEmitter<any>();

  @Output()
  updateSummary = new EventEmitter<any>();

  @Output()
  remove = new EventEmitter<any>();

  toppings = [
    'bacon', 'pepperoni', 'mushroom', 'olive', 'basil', 'sweetcorn',
    'onion', 'tomato'];


  selection = [];

  isCollapsed: boolean[] = [];

  constructor() { }

  ngOnInit() {
    this.isCollapsed[0] = false;
  }

  addPizza() {
    this.add.emit();
  }

  removePizza(index) {
    this.remove.emit(index);
    this.toppingsSelected.splice(index, 1);
  }

  updateSize(size: string, i) {
      this.updateSummary.emit();
  }

  updateTopping(topping: string, i) {
    if (!this.toppingsSelected[i]) {
      this.toppingsSelected[i] = [];
    }
    if (this.toppingsSelected[i].includes(topping)) {
      this.toppingsSelected[i] = this.toppingsSelected[i].filter((x: string) => topping !== x);
    } else {
      this.toppingsSelected[i].push(topping);
    }
    this.pizzasForm.controls[i].get('toppings').setValue(this.toppingsSelected[i]);
    this.updateSummary.emit();
  }
}
