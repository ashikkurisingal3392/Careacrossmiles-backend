const jwt =require('jsonwebtoken')

const jwtMiddleware =async(req,res,next)=>{

    console.log('inside jwt');

    try{

        const token =req.headers.authorization.slice(7)
        console.log(token);
        console.log(process.env.jwtKey);
        jwtVerification=jwt.verify(token,process.env.jwtKey)

        console.log(jwtVerification);
        
        
        req.payload =jwtVerification.useremail
        next()

    }
    catch(err){

        res.status(401).json('Authorizaton error')

    }
    
}

module.exports =jwtMiddleware