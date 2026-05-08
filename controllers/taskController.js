const tasks = require('../models/taskModel')


//add Task :POST 

exports.addTasks = async (req, res) => {

    console.log('inside add task');
    console.log(req.body);
    const { title, payment, location, helper, carerecipient, date, description, category,family,budget } = req.body
    console.log("payload:", req.payload)
    const userEmail = req.payload
    const uploadedImages = []
    req.files.map(item => uploadedImages.push(item.filename))
    console.log(title, payment, location, helper, carerecipient, date, description, category,family, userEmail, uploadedImages);
     
      //res.send('request recieved')
   const existingTask =await tasks.findOne({title,userEmail,date})



    if (existingTask) {

        res.status(401).json({ message: "Task alerady existing.." })
    }
    else {

        const newTask = tasks({
            title, payment, location, helper, carerecipient, date, description, category,family, userEmail, uploadedImages,budget

        })

        await newTask.save()
        res.status(200).json({ message: "Task added succesfully ", newTask })

    }

}

//GET : all tasks

exports.getAllTasks =async(req,res)=>{

    console.log("inside get all tasks");

    const userEmail =req.payload
    console.log(userEmail);

   // res.send('request send')
    try{

         const allTasks = await tasks.find({userEmail})
        res.status(200).json({ message: "All Tasks fetched.", allTasks })


    }
    catch(err){

        res.status(500).json({message:'Server Error',err})
    }

   
    
    
}

//GET : all tasks for helpers dashboard

exports.getAllTasksHelpers =async(req,res)=>{

    console.log("inside get all tasks");

    const userEmail =req.payload
    console.log(userEmail);

   // res.send('request send')
    try{

         const allTasks = await tasks.find()
        res.status(200).json({ message: "All Tasks for helper dashboard fetched.", allTasks })


    }
    catch(err){

        res.status(500).json({message:'Server Error',err})
    }

   
    
    
}

//PUT: accept a task by helper

exports.acceptTask =async(req,res)=>{

    console.log('inside accept task');

    const{id}=req.params
    const helperEmail=req.payload

    console.log(id);
     console.log(helperEmail);

     try{
        const task =await tasks.findOneAndUpdate({_id:id,status:'open'},
        {
            status:'inprogress',
            helperEmail:helperEmail
        },{new:true})

        if(!task){

            res.status(404).json({message:'Task already accepted'})
        }
          res.status(200).json({ message: "A Task updated.", task })

     }
     catch(err){

          res.status(500).json({ message: "Server Error", err })
     }

}

//GET: helper individual  accepted tasks
exports.getHelperTasks =async(req,res)=>{

    console.log("inside get all helper tasks");

    const userEmail =req.payload
    console.log(userEmail);

   // res.send('request send')
    try{

         const allTasks = await tasks.find({helperEmail:userEmail,status:'inprogress'})
         res.status(200).json({ message: "All Tasks accepted by helper fetched.", allTasks })


    }
    catch(err){

        res.status(500).json({message:'Server Error',err})
    }

   
    
    
}

//PUT: release a task by helper

exports.releasetask =async(req,res)=>{

    console.log('inside release task');

    const{id}=req.params
    const helperEmail=req.payload

    console.log(id);
     console.log(helperEmail);

     try{
        const task =await tasks.findOneAndUpdate({_id:id,status:'inprogress'},
        {
            status:'open',
        },{new:true})

        if(!task){

            res.status(404).json({message:'Task already released'})
        }
          res.status(200).json({ message: "A Task released ...", task })

     }
     catch(err){

          res.status(500).json({ message: "Server Error", err })
     }

}

// PUT: complete task 

exports.completeTask =async(req,res)=>{

    console.log('inside complete task');

    const{id}=req.params
    const helperEmail=req.payload

    console.log(id);
     console.log(helperEmail);

     const{completeNote}=req.body


     const uploadProof=[]
    
     req.files.map(item=>uploadProof.push(item.filename))

     try{
        const task =await tasks.findOneAndUpdate({_id:id,status:'inprogress'},
        {
            status:'completed',
            proof:uploadProof,
            helperEmail:helperEmail,
            completeNote:completeNote

        },{new:true})

        if(!task){

            res.status(404).json({message:'Task already completed'})
        }
          res.status(200).json({ message: "A Task completed.", task })

     }
     catch(err){

          res.status(500).json({ message: "Server Error", err })
     }

}

//GET: helper Completed  tasks
exports.getCompletedTasks =async(req,res)=>{

    console.log("inside get all helper tasks");

    const userEmail =req.payload
    console.log(userEmail);

   // res.send('request send')
    try{

         const allTasks = await tasks.find({helperEmail:userEmail,status:'completed'})
         res.status(200).json({ message: "All Tasks Completed by helper fetched.", allTasks })


    }
    catch(err){

        res.status(500).json({message:'Server Error',err})
    }

   
    
    
}