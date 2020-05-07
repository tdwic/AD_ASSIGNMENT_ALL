//Importing Express
const express = require('express');
//Importing Mongoose
const mongo =  require('mongoose');
//Importing bodyParser
const bParser = require('body-parser');
//Importing Cors
const cors = require('cors');

const app = express();

require('dotenv').config();

app.use(bParser.urlencoded({extended: true}));
app.use(bParser.json());
app.use(cors());

app.use("/SensorAPI", require("./Route/FireSensorRoute"));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(422).send({ error: err.message });
});


//Creating the connection with MongoDB.
mongo.connect(
    'mongodb+srv://Teambravo:teambravo123@cluster0-yeb21.gcp.mongodb.net/test?retryWrites=true&w=majority'
).then(() => {
    app.listen(5000);
}).catch((err) => {
    console.log(err);
});


