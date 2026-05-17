const doctors =require('../models/doctorModel')


//add doctors

exports.addDoctor = async (req, res) => {

    console.log('inside add doctor');
    console.log(req.body);
    const { fullName, specialization, hospitalName, location, fee } = req.body
    console.log("payload:", req.payload)
    const userEmail = req.payload

    console.log(fullName, specialization, hospitalName, location, fee,userEmail);
    try{


      //res.send('request recieved')
   const existingDoctor =await doctors.findOne({fullName,userEmail})

    if (existingDoctor) {

        res.status(401).json({ message: "Doctor alerady existing.." })
    }
    else {

        const newDoctor = doctors({
            fullName, specialization, hospitalName, location, fee,userEmail })

        await newDoctor.save()
        res.status(200).json({ message: "New Doctor added succesfully ", newDoctor })

    }

    }
    catch(err){

         res.status(500).json({ message: 'Server Error', err })

    }
     

}

//get doctors list

exports.getAllDoctors = async (req, res) => {

    console.log("inside all doctors list");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allDoctors = await doctors.find({ userEmail: userEmail })
        res.status(200).json({ message: "A doctors details fetched.", allDoctors })

    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }

}

