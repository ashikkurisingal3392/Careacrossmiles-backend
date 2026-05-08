const mongoose =require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
         type:String,
         required:true
    },
    payment:{
        type:Number,
        required:true
    },
     location:{
        type:String,
        required:true
    },
     helper:{
       type:String,
        required:true
    },
     carerecipient:{
       type:String,
        required:true
    },
     date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true

    },
      family:{
        type:String,
        required:true

    },
       budget:{
        type:Number,
        default:""

    },
    
     userEmail:{
        type:String,
        required:true
    },
    uploadedImages:{
        type:Array,
        required:true

    },

     status:{
        type:String,
        default:'open'
    },
    helperEmail: {
    type: String,
    default: ""
  },
  proof:{
      type:Array,
      required:true

  },
  completeNote:{
     type:String,
        default:""

  }
   
});

module.exports =mongoose.model('Tasks',taskSchema)