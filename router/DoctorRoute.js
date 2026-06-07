const express =require('express')

const jwtMiddleware=require('../middlewares/jwtMiddleware')

const doctorController= require('../controllers/doctorController')

const doctorRoute=express.Router()

//get all doctors
doctorRoute.get('/api/getdoctors',jwtMiddleware,doctorController.getAllDoctors)

//add doctor

doctorRoute.post('/api/adddoctor',jwtMiddleware,doctorController.addDoctor)

doctorRoute.delete('/api/doctor/:id',jwtMiddleware,doctorController.deleteDoctor)


module.exports=doctorRoute