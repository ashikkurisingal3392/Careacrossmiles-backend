const express =require("express")

const jwtMiddleware =require("../middlewares/jwtMiddleware")

const pharmacyController=require("../controllers/pharmacyController")

const pharmacyRoute=express.Router()

//add a pharamacy

pharmacyRoute.post("/api/pharmacy",jwtMiddleware,pharmacyController.addPharmacy)

//get pharamacy
pharmacyRoute.get("/api/pharmacy",jwtMiddleware,pharmacyController.getPharamacy)

//delete pharamacy
pharmacyRoute.delete("/api/pharmacy/:id",jwtMiddleware,pharmacyController.deletePharamacy)

module.exports =pharmacyRoute