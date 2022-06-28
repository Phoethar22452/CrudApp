var Userdb = require('../model/model');
const validator = require('../validator/validator');

//create and save new user
exports.create=(req,res)=>{

    if(!req.body){
        res.status(400).send({message:"Content can not be empty"});
        return;    
    }
    
    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })
    const errors = validator.resultsValidator(req)
    if (errors.length > 0) {
        return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
        })
    }
    //save the user in database
    user
    .save(user)
    .then(data=>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occoured while creating a create operation"
        })
    })
}

//retrieve and return all users or single users
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message:"Not Found User With Id"+id})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error retrieving User With Id"+id})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error Occured While retrieving User Information"})
        })
    }
}

//update a new identify user by user id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data To Be Update Cannot Be Empty"})
    }
    const id = req.params.id;
    const errors = validator.resultsValidator(req)
    if (errors.length > 0) {
        return res.status(400).json({
        method: req.method,
        status: res.statusCode,
        error: errors
        })
    }
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(400).send({message:`Cannot Update User With ${id}. May be user not found`})
        }else{
            //console.log(data)
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update User Information"})
    })
}

//delete a user with specified by user id{
    exports.delete = (req,res)=>{
        const id = req.params.id;

        Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(400).send({message:`Cannot Delete With id ${id}.May be id is wrong`})
            }else{
                res.send({
                    message:"User Was Deleted Successfully"
                })
            }
        })
        .catch(err=>{
            res.status(500).send({message:`Could Not Delete The User With id ${id}`})
        })
    }
