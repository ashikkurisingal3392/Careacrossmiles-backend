const express =require('express')

const jwtMiddleware =require('../middlewares/jwtMiddleware')

const medicineController=require('../controllers/medicineController')

const medicineRoute=express.Router()



module.exports =medicineRoute