//Importing Mongoose Modules.
const mongo = require('mongoose');
//const autoIncrement = require('mongoose-auto-increment');

//Defining Schema Object
const Schema = mongo.Schema;

//Adding Auto Incrementing Plugin.
const AutoIncrementFactory = require('mongoose-sequence');
const connection = mongo.createConnection('mongodb+srv://abc:abc@cluster0-abp78.mongodb.net/test?retryWrites=true&w=majority');
const AutoIncrement = AutoIncrementFactory(connection);

//Defining Fields for the Schema.
const fireSensorSchema = new Schema({
    activeStatus: {type: Boolean, required: false, default:false},
    floorNumber: {type: String, required: true},
    roomNumber: {type:Number, required:true},
    smokeLvl :{type:Number, required:false, default: 0},
    co2Lvl :{type:Number, required:false, default:0}
});

//Assigning the plugin to Schema.
fireSensorSchema.plugin(AutoIncrement, {inc_field: 'id'})

//Creating FireSensor Model and exporting it.
module.exports = mongo.model('FireSensors', fireSensorSchema)
