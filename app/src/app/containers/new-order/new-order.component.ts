import { Prices } from 'src/app/models/PizzaInfo';
import { PizzaInfo, BasePizzaInfo } from './../../models/PizzaInfo';
import { PizzaService } from './new-order.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { PizzaValidators } from '../../validators/pizza.validator';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss']
})
export class NewOrderComponent implements OnInit {

  constructor(private fb: FormBuilder, private pizzaService: PizzaService) { }

  myForm: FormGroup;

  pizzaInfo: PizzaInfo;

  prices: Prices;

  toppingsSelected:string[] =[];

  ngOnInit() {
    this.getPizzaDetails();
    this.initForm();
  }

  initForm() {
    this.myForm = this.fb.group({
      details: this.fb.group({
        name: ['', Validators.required],
        email: [''],
        address: ['', Validators.required],
        phone: ['', Validators.required],
      }, { validator: PizzaValidators.checkEmailsMatch }),
      pizzas: this.fb.array([
        this.createPizza()
      ])
    });

    this.updateSummary();
  }

  /* This will submit the order filled 
   *
   *
   * @memberof NewOrderComponent
   */
  submitOrder() {
    const personalDetails = this.myForm.get('details').value;
    const order = this.myForm.get('pizzas').value;
    if (this.myForm.valid) {
      this.pizzaService.submitOrder({ personalDetails, order}).subscribe(
        response => {
          alert("your order has been sent!");
          this.myForm.reset();
          this.toppingsSelected=[];
          this.initForm();
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.validateAllFormFields(this.myForm);
    }
  }

  /**
   * This will trigger validations
   *
   * @param {FormGroup} formGroup
   * @memberof NewOrderComponent
   */
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }


  /**
   * This will get Pizza details from API
   *
   * @memberof NewOrderComponent
   */
  getPizzaDetails() {
    this.pizzaService.getPizzaDetails().subscribe(
     (response: BasePizzaInfo) => {
        this.pizzaInfo = new PizzaInfo(response);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This will get the prices to
   * to show it in pizza-summary
   * @param {*} items
   * @memberof NewOrderComponent
   */
  getPrices(items) {
    this.pizzaService.updateSummary(items).subscribe(
      (response: Prices) => {
        this.prices = response;
      },
      err => {
        console.log(err);
      });
  }


  /**
   * this will create a pizza form
   *
   * @returns
   * @memberof NewOrderComponent
   */
  createPizza() {
    return this.fb.group({
      size: ['large', Validators.required],
      toppings: ['', ]
    });
  }

  /**
   * This will be trigger to add a new
   * pizza form
   * @memberof NewOrderComponent
   */
  addPizza() {
    const control = this.myForm.get('pizzas') as FormArray;
    control.push(this.createPizza());
    this.updateSummary();
  }

  /**
   * This will remove the form created
   *
   * @param {number} index
   * @memberof NewOrderComponent
   */
  removePizza(index: number) {
    const control = this.myForm.get('pizzas') as FormArray;
    control.removeAt(index);
    this.updateSummary();
  }

  /**
   * This will update the prices shown in Summary
   *
   * @memberof NewOrderComponent
   */
  updateSummary() {
    const items = this.myForm.get('pizzas').value;
    this.getPrices(items);
  }
}
