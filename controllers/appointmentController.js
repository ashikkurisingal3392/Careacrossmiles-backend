const appointments =require('../models/appointmentModel');
const { patch } = require('../router/appointmentRoute');


//add appointment

exports.addAppointment = async (req, res) => {

    console.log('inside book appointment');
    console.log(req.body);
    const { doctorID, patientName, appointmentDate, notes } = req.body
    console.log("payload:", req.payload)
    const userEmail = req.payload

    console.log(doctorID, patientName, appointmentDate, notes,userEmail);

    try{

        const existingAppointment =await appointments.findOne({doctorID,userEmail,appointmentDate})

    if (existingAppointment) {

        res.status(401).json({ message: "Appointment alerady Booked.." })
    }
    else {

        const newAppointment = appointments({ doctorID, patientName, appointmentDate, notes,userEmail })

        await newAppointment.save()
        res.status(200).json({ message: "New appointment booked succesfully ", newAppointment })

    }


    }
    catch(err){

        res.status(500).json({ message: "Server Error", err })
    }
     
      //res.send('request recieved')
   

}

//get appointment list

exports.getAllAppointments = async (req, res) => {

    console.log("inside all appointment list");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allAppointments = await appointments.find({userEmail: userEmail }).populate({path:"doctorID"})
        //change to aggregrate later
        console.log(allAppointments);
        
        res.status(200).json({ message: "All appointments  fetched.", allAppointments })

    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }

}