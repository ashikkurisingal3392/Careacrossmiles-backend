const express =require('express')

const jwtMiddleware=require('../middlewares/jwtMiddleware')

const appointmentController= require('../controllers/appointmentController')

const appointmentRoute=express.Router()

//get all appointment:GET
appointmentRoute.get('/api/getAppointments',jwtMiddleware,appointmentController.getAllAppointments)

//add appointment :POST
appointmentRoute.post('/api/addappointment',jwtMiddleware,appointmentController.addAppointment)

//update appointment :PUT
appointmentRoute.put('/api/updateappointment/:id',jwtMiddleware,appointmentController.updateAppointment)

//cancel appointment :DELETE
appointmentRoute.delete('/api/deleteappointment/:id',jwtMiddleware,appointmentController.deleteAppointment)


module.exports=appointmentRoute