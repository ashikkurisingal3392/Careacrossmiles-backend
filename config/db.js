const mongoose= require('mongoose')

mongoose.connect(process.env.connectionString).then((res)=>{
    console.log(('connection established'));
    
}).catch(err=>{

    console.log("Mongodb error",err);
    

})