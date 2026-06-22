const express =require('express')

const jwtMiddleware =require('../middlewares/jwtMiddleware')

const multerMiddleware=require('../middlewares/multerMiddleware')
//import usercontroller
const userController= require('../controllers/userController')
const multer = require('multer')

const userRouter=express.Router()

//register api -endpoint

userRouter.post('/api/register',userController.registerUser)

//login api-endpoint

userRouter.post('/api/login',userController.loginUser)

//google Login api-endpoint

userRouter.post('/api/googlelogin',userController.googleLoginUser)

//get all helper 

userRouter.get('/api/gethelpers',jwtMiddleware,userController.getAllHelpers)


////PUT: update helper profile

userRouter.put('/api/updateHelper/:id',jwtMiddleware,multerMiddleware.single('profile'),userController.updateHelperProfile)

//user: invite members
userRouter.post('/api/sendemail',jwtMiddleware,userController.sendEmailNotification)


module.exports=userRouter;