const express =require('express')

const jwtMiddleware=require('../middlewares/jwtMiddleware')

const appointmentController= require('../controllers/appointmentController')

const appointmentRoute=express.Router()

//get all appointment
appointmentRoute.get('/api/getAppointments',jwtMiddleware,appointmentController.getAllAppointments)

//add appointment

appointmentRoute.post('/api/addappointment',jwtMiddleware,appointmentController.addAppointment)


module.exports=appointmentRoute