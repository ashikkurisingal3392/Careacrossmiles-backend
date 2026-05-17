const mongoose =require('mongoose')
const { schema } = require('./appointmentModel')

const medicineSchema =new  mongoose.Schema({
   
    doctorId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Doctors"
    }
  ,
  medicine:{
    type:String,
    required:true
  }
  ,
    patientName:{
        type:String,
        required:true
    },
    orderDate:{
        type:Date,
        required:true
    },
    prescription:{

        type:String,
        default:""

    },
    note:{
        type:String,
        default:""
    },
    userEmail:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Medicine",medicineSchema)