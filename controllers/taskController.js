const tasks = require('../models/taskModel')

const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);





//add Task :POST 

exports.addTasks = async (req, res) => {

    console.log('inside add task');
    console.log(req.body);
    const { title, payment, location, helper, carerecipient, date, description, category, family, budget } = req.body
    console.log("payload:", req.payload)
    const userEmail = req.payload
    const uploadedImages = []
    req.files.map(item => uploadedImages.push(item.filename))

    console.log(title, payment, location, helper, carerecipient, date, description, category, family, userEmail, uploadedImages, budget);

    try {


        //res.send('request recieved')
        const existingTask = await tasks.findOne({ title, userEmail, date })



        if (existingTask) {

            res.status(401).json({ message: "Task alerady existing.." })
        }
        else {

            const newTask = tasks({
                title, payment, location, helper, carerecipient, date, description, category, family, userEmail, uploadedImages, budget

            })

            await newTask.save()
            res.status(200).json({ message: "Task added succesfully ", newTask })

        }


    }
    catch (err) {

        res.status(500).json({ message: "Server Error ", err })


    }


}

//GET : all tasks

exports.getAllTasks = async (req, res) => {

    console.log("inside get all tasks");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allTasks = await tasks.find({ userEmail })
        res.status(200).json({ message: "All Tasks fetched.", allTasks })


    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }




}

//GET : all tasks for helpers dashboard

exports.getAllTasksHelpers = async (req, res) => {

    console.log("inside get all tasks");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allTasks = await tasks.find()
        res.status(200).json({ message: "All Tasks for helper dashboard fetched.", allTasks })


    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }




}

//PUT: accept a task by helper

exports.acceptTask = async (req, res) => {

    console.log('inside accept task');

    const { id } = req.params
    const helperEmail = req.payload

    console.log(id);
    console.log(helperEmail);

    try {
        const task = await tasks.findOneAndUpdate({ _id: id, status: 'open' },
            {
                status: 'inprogress',
                helperEmail: helperEmail
            }, { new: true })

        if (!task) {

            res.status(404).json({ message: 'Task already accepted' })
        }
        res.status(200).json({ message: "A Task updated.", task })

    }
    catch (err) {

        res.status(500).json({ message: "Server Error", err })
    }

}

//GET: helper individual  accepted tasks
exports.getHelperTasks = async (req, res) => {

    console.log("inside get all helper tasks");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allTasks = await tasks.find({ helperEmail: userEmail, status: 'inprogress' })
        res.status(200).json({ message: "All Tasks accepted by helper fetched.", allTasks })


    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }




}

//PUT: release a task by helper

exports.releasetask = async (req, res) => {

    console.log('inside release task');

    const { id } = req.params
    const helperEmail = req.payload

    console.log(id);
    console.log(helperEmail);

    try {
        const task = await tasks.findOneAndUpdate({ _id: id, status: 'inprogress' },
            {
                status: 'open',
            }, { new: true })

        if (!task) {

            res.status(404).json({ message: 'Task already released' })
        }
        res.status(200).json({ message: "A Task released ...", task })

    }
    catch (err) {

        res.status(500).json({ message: "Server Error", err })
    }

}

// PUT: complete task 

exports.completeTask = async (req, res) => {

    console.log('inside complete task');

    const { id } = req.params
    const helperEmail = req.payload

    console.log(id);
    console.log(helperEmail);

    const { completeNote } = req.body


    const uploadProof = []

    req.files.map(item => uploadProof.push(item.filename))

    try {
        const task = await tasks.findOneAndUpdate({ _id: id, status: 'inprogress' },
            {
                status: 'completed',
                proof: uploadProof,
                helperEmail: helperEmail,
                completeNote: completeNote

            }, { new: true })

        if (!task) {

            res.status(404).json({ message: 'Task already completed' })
        }
        res.status(200).json({ message: "A Task completed.", task })

    }
    catch (err) {

        res.status(500).json({ message: "Server Error", err })
    }

}

//GET: helper Completed  tasks
exports.getCompletedTasks = async (req, res) => {

    console.log("inside get all helper tasks");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allTasks = await tasks.find({ helperEmail: userEmail, status: 'completed' })
        res.status(200).json({ message: "All Tasks Completed by helper fetched.", allTasks })


    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }




}

//Delete : user task remove

exports.deleteTask = async (req, res) => {

    console.log("inside task delete");

    const userEmail = req.payload

    const { id } = req.params
    console.log(userEmail);


    try {

        const deletedTask = await tasks.findOneAndDelete({ _id: id, userEmail })
        console.log(deletedTask);

        if (!deletedTask) {
            res.status(404).json({ message: "Task not found" })
        }

        res.status(200).json({ message: 'Task deleted successfully ', deletedTask })



    }
    catch (err) {
        res.status(500).json({ message: 'Server Error', err })

    }


}

//Update : user payment to helper

// exports.makePayment = async (req, res) => {

//     console.log("inside make payment");

//     const userEmail = req.payload

//     const { id } = req.params
//     console.log(userEmail);

//     console.log(id);
    

//     const  taskDetails  = req.body

//     console.log(taskDetails);
    


//     try {

//         const updateTask = await tasks.findByIdAndUpdate(id,
//             {
//                 $set:{paymentStatus: true},
//              } 
//             , { new: true })


//              if (!updateTask) {
//             res.status(404).json({ message: "Task not found" })
//         }


//         const session = await Stripe.checkout.sessions.create({
//             payment_method_types:["card"],
//             success_url:'http://localhost:5173/paymentsuccess',
//             cancel_url:"http://localhost:5173/paymenterror",
            
//             line_items: [
//                 {
//                     price_data:{
//                         currency:'usd',
//                         product_data:{
//                             name:taskDetails.title,
//                             metadata:{
//                                 title:taskDetails.title,
//                                 date:taskDetails.date
//                             },
//                         },
//                         unit_amount:Math.round(Number(taskDetails.payment)*100)
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//         });

//          // Return Stripe URL
//         res.status(200).json({ url: session.url });


//         console.log(updateTask);
//         console.log(session);
        

       

//         res.status(200).json({ message: 'Task Updated successfully ', updateTask })



//     }
//     catch (err) {
//         res.status(500).json({ message: 'Server Error', err })

//     }


// }

exports.makePayment = async (req, res) => {
    try {
        const userEmail = req.payload;
        const { id } = req.params;
        const taskDetails = req.body;

        // Update task
        // const updateTask = await tasks.findByIdAndUpdate(
        //     id,
        //     { $set: { paymentStatus: true } },
        //     { new: true }
        // );

        // if (!updateTask) {
        //     return res.status(404).json({ message: "Task not found" });
        // }

        // Create Stripe session
        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            success_url: 'https://careacrossmiles-frontend.vercel.app/paymentsuccess',
            cancel_url: 'https://careacrossmiles-frontend.vercel.app/paymenterror',
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: taskDetails.title,
                            metadata: {
                                title: taskDetails.title,
                                date: taskDetails.date
                            }
                        },
                        unit_amount: Math.round(Number(taskDetails.payment) * 100)
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            metadata:{
                taskId:id
            }
        });

        // Return Stripe URL
        res.status(200).json({ url: session.url });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server Error', err });
    }
};

exports.stripeWebhook=async(req,res)=>{

     const sig = req.headers["stripe-signature"];

        let event;

        try {
            event = Stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );
        } catch (err) {
            console.log("Webhook signature error:", err.message);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Payment success event
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const taskId = session.metadata.taskId;

            tasks.findByIdAndUpdate(
                taskId,
                { paymentStatus: true },
                { new: true }
            )
                .then(() => console.log("Payment updated in DB"))
                .catch(err => console.log(err));
        }

        res.json({ received: true });
    
}
