export interface BasePizzaInfo {
    toppings: string[];
    sizes: string[];
}

export interface Prices {
    toppings: any;
    sizes: any;
    total: number;
}

export class PizzaInfo implements BasePizzaInfo {
    toppings: string[];
    sizes: string[];

    constructor(pizzaInfo) {
        this.toppings = pizzaInfo.toppings;
        this.sizes = pizzaInfo.sizes;
    }
}
