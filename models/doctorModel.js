const mongoose =require('mongoose')

const doctorSchema=new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
      specialization:{
        type:String,
        required:true
    },
      hospitalName:{
        type:String,
        required:true
    },
      location:{
        type:String,
        required:true
    },
      fee:{
        type:Number,
        required:true
    },
      userEmail:{
        type:String,
        required:true
    },


})

module.exports =mongoose.model("Doctors",doctorSchema)