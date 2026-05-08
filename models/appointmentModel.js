const mongoose =require('mongoose')

const appointmentSchema=new mongoose.Schema({

    doctorID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Doctors"
    },
      patientName:{
        type:String,
        required:true
    },
      appointmentDate:{
        type:Date,
        required:true
    },
      location:{
        type:String,
        default:""
    },
      notes:{
        type:String,
        default:""
    },
      userEmail:{
        type:String,
        required:true
    },


})

module.exports =mongoose.model("Appointments",appointmentSchema)