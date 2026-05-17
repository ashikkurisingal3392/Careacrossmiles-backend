const mongoose =require('mongoose')

const pharmacySchema =new  mongoose.Schema({
   
  pharamcyName:{
    type:String,
    required:true
  },

    address:{
        type:String,
        required:true
    }
,
    userEmail:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Pharmacy",pharmacySchema)