//Importing Express
const express = require('express');
//Importing the Fire Sensor Det Model
const AlarmSensorModel = require('../Model/FireSensorDetModel');

const route = express.Router();

//Email Service
const emailService = require('nodemailer');
require('dotenv').config();

let transporter = emailService.createTransport({
    service: 'gmail',
    auth:{
        user:'it18146516@my.sliit.lk',
        pwd: process.env.PASSWORD
    }
});

route.post('/alarmSensor', (req,res,next) => {
    AlarmSensorModel.create(req.body).then((alarmSensor) =>{
        res.send(alarmSensor);
    }).catch(next)
});


route.put('/alarmSensor/:id', (req,res,next) => {
    AlarmSensorModel.findOneAndUpdate(
        {id: req.params.id},
        {$set: req.body},
        {new : true},
        (error, document) => {
            if(document.co2Lvl > 5 || document.smokeLvl > 5){
                let email = {
                    from:'it18146516@my.sliit.lk',
                    to:'it18163728@my.sliit.lk',
                    subject:'Alert of CO2 and Smoke Level',
                    text:`Smoke Level or CO2 Level has passed its basic Limits.`
                };
                transporter.sendMail(email, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                console.log("Email Has been Send to it18163728@my.sliit.lk");
                console.log("From :- it18146516@my.sliit.lk");
                console.log("Title :- Alert of CO2 and Smoke Level");
                console.log("Text:- Smoke Level or CO2 Level has passed its basic Limits.");

                console.log("SMS has send to 0772134768");
            }

            res.send(document);
        }
    )
});

route.get('/alarmSensor', (req,res,next) =>{
    AlarmSensorModel.find({}, (error,alarmSen) =>{
        let map = {};
        alarmSen.forEach((element) =>{
            map[element.id] = element;
        });

        res.send(map);
    }).catch(next);

});

route.get('/alarmSen', (req,res,next)=>{
    AlarmSensorModel.find({}, (error, alarmSen)=>{
        res.send(alarmSen);
        //console.log(process.env.PASSWORD);
    }).catch(next);
});

route.get('/alarmSensor/:id', (req,res,next) =>{
    AlarmSensorModel.find({id:req.params.id}, (error,alarmSen) =>{
        let map = {};
        alarmSen.forEach((element) =>{
            map[element.id] = element;
        });

        res.send(map);
    }).catch(next);
});

route.delete('/alarmSensor/:id' ,(req,res,next) =>{
    AlarmSensorModel.deleteOne({id: req.params.id}, (error, output) =>{
        if(output.deletedCount){
            console.log(`Delete Complete. ${req.params.id}`);
        }else{
            console.log(`Error While Deleting ${req.params.id}`);
        }
        res.send(200);
    }).catch(next);

});

module.exports = route;



