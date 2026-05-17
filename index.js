//import dotenv 
require('dotenv').config()

const express=require('express')
//import db
require('./config/db')

//import router nad cors
const cors=require('cors')

const userRoute=require('./router/userRouter')
const taskRoute =require('./router/TaskRoute')
const doctorRoute=require('./router/DoctorRoute')
const appointmentRoute=require('./router/appointmentRoute')
const pharmacyRoute=require('./router/pharmacyRoute')



const careServer =express()

//connect backend and frontend
careServer.use(cors())
careServer.use(express.json()) //parse json to js
careServer.use(userRoute)
careServer.use(taskRoute)
careServer.use(doctorRoute)
careServer.use(appointmentRoute)
careServer.use(pharmacyRoute)


careServer.use('/Uploads',express.static('./Uploads'))

const PORT='3000' || process.env.PORT

careServer.get('/',(req,res)=>{

    res.send('Welcome to CareAcrossMiles')
})

careServer.get('/about',(req,res)=>{

    res.send('about page')
})

careServer.listen(PORT,()=>{

    console.log("CareServer running on port 3000");
    


})