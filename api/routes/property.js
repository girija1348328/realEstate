const express =require("express") 

const{
  createProperty,updateProperty,deleteProperty,getProperty,getProperties,countByCity,countByType,getPropertyRooms
} =require("../controllers/property.js") ;
const Hotel = require("../models/Property.js") ;
const {verifyAdmin} = require("../utils/verifyToken.js") 
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createProperty);

//UPDATE
router.put("/:id", verifyAdmin, updateProperty);
//DELETE
router.delete("/:id", verifyAdmin, deleteProperty);
//GET

router.get("/find/:id", getProperty);
//GET ALL
router.get("/", getProperties);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getPropertyRooms);

module.exports = router;