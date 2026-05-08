const mongoose =require('mongoose')
const { array } = require('../middlewares/multerMiddleware')

const userSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
       phone: {
        type: String,
        default: ""
    },
      family: {
        type: String,
        default: ""
        
    },
     profile: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    role: {
        type: String,
        enum:["user","helper","admin"],
        default: "user"
    },
    helperDetails:{
        skills:{
            type:String,
            default: ""
            
        },
          availability:{
            type:String,
            default: ""
            
        },
        experience:{
            type:String,
            default: ""
            
        },
        status:{
            type:String,
            default:'not verified'

        },
        transport:{
            type:String,
            default:""

        },
         district:{
            type:String,
            default:""

        },
          travelRadius:{
            type:String,
            default:""

        },
           language:{
            type:Array,
            default:[]

        },
    }
})

module.exports =mongoose.model("User",userSchema)