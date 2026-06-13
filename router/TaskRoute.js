const express =require('express')

//to use form data without files, store in memorystorage not diskstorage
// const multer = require('multer')
// const upload = multer({ storage: multer.memoryStorage() })


 const jwtMiddleware =require('../middlewares/jwtMiddleware')

const multerMiddleware =require('../middlewares/multerMiddleware')

const taskController =require('../controllers/taskController')

const taskRoute =express.Router()

//addtask

taskRoute.post('/api/addtask',jwtMiddleware,multerMiddleware.array('uploadedImages',3),taskController.addTasks)



//caretask show in dashboard

taskRoute.get('/api/gettasks',jwtMiddleware,taskController.getAllTasks)


//Helper dashboard  tasks

taskRoute.get('/api/gettaskshelper',jwtMiddleware,taskController.getAllTasksHelpers)

//Helper accept  task

taskRoute.put('/api/taskaccept/:id',jwtMiddleware,taskController.acceptTask)

//helper individual tasks list
taskRoute.get('/api/mytask',jwtMiddleware,taskController.getHelperTasks)

//Helper release  task

taskRoute.put('/api/releasetask/:id',jwtMiddleware,taskController.releasetask)

//helper complete task

taskRoute.put('/api/completetask/:id',jwtMiddleware,multerMiddleware.array('proof',2),taskController.completeTask)

//GET: helper completed task list
taskRoute.get('/api/mytaskscompleted',jwtMiddleware,taskController.getCompletedTasks)

//delete tasks in user

taskRoute.delete('/api/deletetask/:id',jwtMiddleware,taskController.deleteTask)

//make payment by user

taskRoute.put('/api/makepayment/:id',jwtMiddleware,taskController.makePayment)

// taskRoute.post('/api/stripe/webhook',taskController.stripeWebhook)



module.exports =taskRoute