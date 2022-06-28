const mongoose = require('mongoose');
//schema//mongoose schema allows us to define shape and content of the document
var schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:String,
    status:String
});

const Userdb = mongoose.model('userdb',schema);

module.exports = Userdb;