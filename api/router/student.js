const express = require('express');
const mongoose  = require('mongoose');
const moment = require('moment');
const router = express.Router();
const Student = require('../model/student');

const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

function validate(data, res) {
    let error = null;
    for(let i = 0; i < data.length; i++){
        if(typeof data[i].name != 'string'){
            error =  `Name is not String for ${JSON.stringify(data[i])}`;
            break;
        }
        if(typeof data[i].age != 'number'){
            error = `age is not Number for ${JSON.stringify(data[i])}`;
            break;   
        }
        // phone_number Validation
        if(!regex.test(data[i].phone_number)){
            error =  `phone_number is incorrect for ${JSON.stringify(data[i])}`;
            break;
        }

        if(moment(!data[i].date_of_birth, "YYYY-MM-DD").isValid()){
            error = `date_of_birth is incorrect for ${JSON.stringify(data[i])}`;
            break;
        }
    }
    if(error) {
       return { error : error};

    } else {

        return { data : data };
    }
    return error;
}

router.post('/data/bulk', (req, res, nextFun) => {
    let data = req.body;
    data = validate(data, res);
    if(data.error) {
        res.status(500).json({error: data.error});
        return;
    } else {
        data = data.data;
    }
    if(data.length) {
        let bulk = Student.collection.initializeOrderedBulkOp();
        let counter = 0;
        data.forEach(function(obj) {         

            bulk.insert(obj);           
            counter++;
    
            if (counter % 1000 == 0 ) {
                bulk.execute(function(err, result) {            
                    bulk = Student.collection.initializeOrderedBulkOp();
                    nextFun();
                });
            }
        });  
        if (counter % 1000 != 0 ){
            bulk.execute(function(err, result) {
                nextFun();             
            }); 
        } 
    } else {
        console.error(`Please check the payload. Payload is empty and it should be array`);
        res.status(500).json({ error: `Please check the payload. Payload is empty and it should be array` });
    }
})


router.post('/data/record', (req, res, next) => {
    let data = req.body;
    data = validate(data, res);
    if(data.error) {
        res.status(500).json({error: data.error});
        return;
    } else {
        data = data.data;
    }
   
    if(data.length) {
        if(data.length <= 30){
            Student.collection.insertMany(data, (err, docs) => {
                if (err){ 
                    res.status(500).json({ error: `Error in writing record in database` });
                } else {
                    console.log(`Records saved successfully...`);
                    res.status(200).json({sucess: `Records saved successfully...`});
                }
            });
        } else{
            console.error(`Insert Records Limit is Exceeds`);
            res.status(500).json({ error: `Exception limit exceded max record should be 30` });
        }
    } else {
        console.error(`Please check the payload. Payload is empty and it should be array`);
        res.status(500).json({ error: `Please check the payload. Payload is empty and it should be array` });
    }
})

router.post('/data', (req, res, next) => {
    let data = req.body;
    data = validate(data, res);
    if(data.error) {
        res.status(500).json({error: data.error});
        return;
    } else {
        data = data.data;
    }
    if(data.length) {
        if(data.length && data.length == 50){
            Student.collection.insertMany(data, (err, docs) => {
                if (err){ 
                    res.status(500).json({ error: `Error in writing record in database` });
                } else {
                    console.log(`Records saved successfully...`);
                    res.status(200).json({sucess: `Records saved successfully...`});
                }
            });
        } else{
            console.error(`Insert Records should be 50`);
            res.status(500).json({ error: `Exception inserted record should be 50` });
        }
    } else {
        console.error(`Please check the payload. Payload is empty and it should be array`);
        res.status(500).json({ error: `Please check the payload. Payload is empty and it should be array` });
    }
})


module.exports = router