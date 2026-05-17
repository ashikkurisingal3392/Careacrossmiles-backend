const pharmacy =require("../models/pharmacyModel")

//add a pharamacy
exports.addPharmacy=async(req,res)=>{

    console.log('insdie add pharamcy');
  

    const{pharamcyName,address}=req.body

    const userEmail =req.payload

    console.log(userEmail);
    
   try{

     const existingPharmacy = await pharmacy.findOne({pharamcyName,userEmail})

     console.log(existingPharmacy);
     

   if(existingPharmacy){

    res.status(401).json({message:"Pharmacy alerady existing.."})
   }
   else{

     const newPharmacy = new pharmacy({pharamcyName,address,userEmail}) 

     await newPharmacy.save()
      res.status(200).json({ message: "New pharmacy added succesfully ",newPharmacy })
   }

   }
   catch(err){

       res.status(500).json({ message: 'Server Error'+ err })
   }
    

}

//get pharamacys list

exports.getPharamacy=async(req,res)=>{

    console.log('insdie get pharamcy list');


    const userEmail =req.payload

    console.log(userEmail);
    
   try{

     const pharmacyList = await pharmacy.find({userEmail}) 

      res.status(200).json({ message: "pharamacy list fetched succesfully ",pharmacyList })
   

   }
   catch(err){

       res.status(500).json({ message: 'Server Error'+ err })
   }
    

}

//delete pharamcy


exports.deletePharamacy=async(req,res)=>{

    console.log('insdie delete a pharamcy');


    const userEmail =req.payload

    const {id}=req.params

    console.log(userEmail);
    console.log(id);
    
    
   try{

    const existingPharmacy = await pharmacy.findById(id)

    console.log(existingPharmacy);
    

    if(!existingPharmacy){

        res.status(401).json({message:"Pharmacy is not existing.."})
    }
    else{

         const deletePharmacy = await pharmacy.findOneAndDelete({_id:id},{userEmail}) 

        res.status(200).json({ message: "pharamacy deleted succesfully ",deletePharmacy })

    }

    
   

   }
   catch(err){

       res.status(500).json({ message: 'Server Error'+ err })
   }
    

}