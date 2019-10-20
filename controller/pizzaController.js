const fs = require('fs');
const errorHandler = require('../util/errorHandler');
const {calculatePrice, getData} = require('../util/utils')

 class PizzaController {
    /**
     * This will get the pizza and toppings list
     * with prices
     * @param {*} req
     * @param {*} res
     * @memberof PizzaController
    */
    async getPizzaDetails(req, res){
        try{ 
            
            const response = await getData('pizzaInfo');
            
            res.send(response)


        }catch(err){
            const error = errorHandler(err);
            res.send(error)
        }
    }

    /**
     * This will return the prices saved in the file.
     *
     * @param {*} req
     * @param {*} res
     * @memberof PizzaController
     */
    async getSummary(req, res){
        try {
            const prices = await  getData('prices');
            
            const total = calculatePrice(req.body, prices);
            
            prices.total = total
            
            res.send(prices)
        
        } catch (err) {
            const error =errorHandler(err);
            res.send(error)
        }
    }
}

module.exports = new PizzaController
