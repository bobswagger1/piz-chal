
const errorHandler = require('../util/errorHandler');
const {calculateTotalOrders, getData,} = require('../util/utils')

 class ReportController {
   
    async getReports(req,res){
        try {
            const orderJson = await getData('orders');
            
            const totalOrders = calculateTotalOrders(orderJson.orders);

            res.send(totalOrders)
            
        } catch (err) {
            const error =errorHandler(err);
            res.send(error)
        }
        
    }
}

module.exports = new ReportController;
