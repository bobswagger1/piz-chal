import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';


@Injectable()
export class PizzaService {

    constructor(private http: HttpClient) {}

    getPizzaDetails() {
       return this.http.get(`/api/pizzaDetails`);
    }

    updateSummary(items) {
        return this.http.post('/api/pizzaSummary', items);
    }

    submitOrder(items) {
        return this.http.post('/api/submitOrder', items);
    }
}
