const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false,
            useCreateIndex:true
        })
        console.log(`MongoDB Connected : ${con.connection.host}`); 
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
//these properties are use to close or stop unwanted warning in console
module.exports = connectDB;