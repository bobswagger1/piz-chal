const errorHandler = require('./errorHandler');
const fs = require('fs');
const { ORDER_STATUS} = require('../util/constant');
const moment = require('moment');
const _ = require('lodash');

const calculatePrice = (items, prices) => {
    let total=0;
    items.forEach(item => {
        total += prices.size[item.size];
        if(item.toppings){
            item.toppings.forEach(price =>{
                total += prices.toppings[price]
            })
        }
    });
    return total.toFixed(2);
}

const calculateTotalOrders = (orderJson) =>{
    try {
        
        const completed = _.sumBy(orderJson, ({status})=> (status == ORDER_STATUS.COMPLETED ))
        const pendings= _.sumBy(orderJson, ({status})=> (status == ORDER_STATUS.PENDING || status== ORDER_STATUS.ACCEPTED));
        const totalSales = _.sumBy(orderJson,({status,total})=> status == ORDER_STATUS.COMPLETED ? parseFloat(total): 0).toFixed(2);
        const grouByTime = _.groupBy(orderJson,'localTime');
        _.sortBy(grouByTime, ['loalTime']);
        
        const timeAndOrders ={
            time:[],
            orders:[]
        }

        Object.keys(grouByTime).forEach(key=>{
            timeAndOrders.time.push(key);
            timeAndOrders.orders.push(grouByTime[key].length);
        })
        
        return {
            completed,
            pendings,
            totalSales,
            timeAndOrders
        }

        
    } catch (err) {
        const error =errorHandler(err);
        return error;
    }
}

/**
 * Will take a file name and 
 * will gete the data from [./data] folder
 * @param {*} file
 * @returns
 */
const getData = (file) =>{
    return new Promise((resolve, reject) =>{
        try {
            fs.readFile(`./data/${file}.json`, 'utf8', (err, response) => {
            
                if (err) {
                    const error = errorHandler(err);
                    resolve(error)
                    
                }else{
                    const data = JSON.parse(response)
            
                    const newData = {...data };
                    
                    resolve(newData);
                }
            
            
            });
        } catch (error) {
            const err = errorHandler(error)
            resolve(err);
        }
    });
}

/**
 * This will write in any 
 * json file inside [./data] 
 * @param {*} file
 * @param {*} jsonString
 * @returns
 */
const createData = (file, jsonString)=>{
    return new Promise((resolve, reject) =>{
        fs.writeFile(`./data/${file}.json`, jsonString, err => {
            if (err) {
                const error = errorHandler(err);
                resolve(error);
            } else {
               resolve({status: 200, message: 'Success!'});
            }
        });
    });
}

/**
 * This will edit a data depending of 
 * the parameter sent.
 * @param {*} item
 * @param {*} jsonList
 * @param {*} property
 * @returns
 */
const editData = (item, jsonList, property) => {
    jsonList.forEach(element=>{
        if(element.id == item.id){
            element[property] = item[property];
        }
    })
    return jsonList
}

module.exports ={
    calculateTotalOrders,
    calculatePrice,
    getData,
    createData,
    editData
} 