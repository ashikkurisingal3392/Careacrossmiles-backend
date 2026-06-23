const user = require('../models/userSchema')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

// const nodemailer = require('nodemailer')

const {Resend} = require('resend')

const resend = new Resend(process.env.RESEND_API_KEY)



//implement register logic

exports.registerUser = async (req, res) => {

    console.log("inside register function", req.body);
    const { username, email, password, phone, family, role, helperDetails } = req.body

    const hashPassword = await bcrypt.hash(password, 10)

    try {
        //user-collection
        const existingUser = await user.findOne({ email })

        if (existingUser) {

            res.status(401).json({ message: "user already existing" })

        }
        else {

            const newUser = new user({ username, email, password: hashPassword, phone, family, role: role || "user", helperDetails: helperDetails || {} })
            await newUser.save()



            res.status(201).json({ message: 'user registration succesfull', newUser })

        }
    }
    catch (err) {

        res.status(500).json({ message: 'server error', err })

    }

}

//login logic

exports.loginUser = async (req, res) => {

    console.log('login function', req.body);

    const { email, password } = req.body



    try {


        const existingUser = await user.findOne({ email })

        if (existingUser) {

            const passwordMatch = await bcrypt.compare(password, existingUser.password)
            console.log(passwordMatch);

            const userData = {
                userId: existingUser._id,
                username: existingUser.username,
                phone: existingUser.phone,
                email: existingUser.email,
                family: existingUser.family,
                phone: existingUser.phone,
                profile: existingUser.family,
                bio: existingUser.bio,
                role: existingUser.role,
                helperDetails: {
                    skills: existingUser.helperDetails?.skills,
                    availability: existingUser.helperDetails?.availability,
                    experience: existingUser.helperDetails?.experience,
                    status: existingUser.helperDetails?.status,
                    transport: existingUser.helperDetails?.transport,
                    district: existingUser.helperDetails?.district,
                    travelRadius: existingUser.helperDetails?.travelRadius,
                    language: existingUser.helperDetails?.language,
                }

            }


            if (passwordMatch) {

                const token = jwt.sign({ useremail: existingUser.email, userid: existingUser._id }, process.env.jwtKey)
                console.log(token);


                res.status(200).json({ message: 'Login successful', existingUser: userData, token })
            }
            else {
                res.status(401).json({ message: "passwords are not match" })
            }

        }
        else {
            res.status(401).json({ message: 'user not found' })
        }
    }
    catch (err) {

        res.status(500).json({ message: "server error", err })
    }

}

//google signin 

exports.googleLoginUser = async (req, res) => {

    console.log('login function', req.body);

    const { username, email, password, profile } = req.body

    try {
        const existingUser = await user.findOne({ email })
        if (existingUser) {
            const token = jwt.sign({ useremail: existingUser.email, userid: existingUser._id }, process.env.jwtKey)

            res.status(200).json({ message: 'Google Login successful', existingUser, token })

        }
        else {
            const newUser = new user({ username, email, password, profile })
            await newUser.save()
            res.status(201).json({ message: 'user Registered succesfully ', newUser })
        }
    }
    catch (err) {

        res.status(500).json({ message: "server error", err })
    }

}


//Get : all helpers
exports.getAllHelpers = async (req, res) => {

    console.log("inside all helpers");

    const userEmail = req.payload
    console.log(userEmail);

    // res.send('request send')
    try {

        const allHelpers = await user.find({ role: 'helper' })
        res.status(200).json({ message: "A helpers details fetched.", allHelpers })

    }
    catch (err) {

        res.status(500).json({ message: 'Server Error', err })
    }

}


//PUT: update helper profile

exports.updateHelperProfile = async (req, res) => {

    console.log("inside helper profile updation");

    const { id } = req.params
    console.log(id);

    // res.send("task completed")

    const { username, email, password, phone, bio } = req.body

    console.log(req.body);


    const skills = req.body["helperDetails.skills"];
    const availability = req.body["helperDetails.availability"];
    const experience = req.body["helperDetails.experience"];
    const transport = req.body["helperDetails.transport"];
    const district = req.body["helperDetails.district"];
    const travelRadius = req.body["helperDetails.travelRadius"];
    const language = req.body["helperDetails.language"];

    const profile = req.file ? req.file.filename : req.body.profile

    console.log(profile);


    try {

        const updateData = {
            username,
            email,
            phone,
            bio,
            profile,
            helperDetails: {
                skills,
                availability,
                experience,
                transport,
                district,
                travelRadius,
                language
            }
        }

        console.log(updateData);


        if (password) {
            updateData.password = password
        }


        const updateHelper = await user.findByIdAndUpdate({ _id: id }, updateData
            , { new: true })

        res.status(200).json({ message: 'Helper profile updation succesfully', updateHelper })

    }
    catch (err) {

        console.log("error: ", err);

        res.status(500).json({ message: 'server error', err })
    }
}

// //send email invitation using nodemailer Gmail SMTP
// exports.sendEmailNotification = async (req, res) => {

//     console.log("inside sendemail ");

//     console.log(req.body);




//     const { email } = req.body

//     console.log(email);


//     try {

//         const transporter = nodemailer.createTransport({
//             host: "smtp.gmail.com",
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'watchmerise030392@gmail.com',
//                 pass: process.env.GMAIL_PASSWORD
//             }, tls: {
//                 rejectUnauthorized: false,
//             },
//         })

//         const mailOptions = {

//             from: 'watchmerise030392@gmail.com',
//             to: email,
//             subject: 'Family Invitation',
//             html: `<h2>You've been invited!</h2>
//                 <p>You have been invited to join the antony family group on Care Across Miles.</p>
//                 <p>Please register and log in to view tasks and updates.</p>`,
//             text: 'dummy email'
//         }

//         const info = await transporter.sendMail(mailOptions)


//         res.status(200).json({
//             message: "Invitation sent successfully",
//             accepted: info.accepted,
//             messageId: info.messageId,
//         });




//     }
//     catch (err) {

//         console.log(err);
//         console.log("EMAIL ERROR MESSAGE:", err.message);
//         console.log("EMAIL ERROR CODE:", err.code);
//         console.log("FULL ERROR:", err);
//         res.status(500).json({
//             message: "Failed to send invitation", error: err.message, code: err.code
//         });



//     }






// }

//send email using resender
exports.sendEmailNotification = async (req, res) => {

    console.log("inside invite email");

    const { email } = req.body

    try {

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'ashikkurisingal@gmail.com',
            subject: 'Family Invitation ',
            html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    })

      return res.status(200).json({
            message: "Invitation sent successfully",
            response
        });



    }
    catch (err) {


        console.log(err);

        return res.status(500).json({
            message: "Failed to send invitation",
            error: err.message
        });


    }

}
