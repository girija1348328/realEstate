const express =require("express") 
const dotenv =require("dotenv");
const propertyRoute = require("./routes/property.js");

const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
dotenv.config();

const connect = async ()=>{
try{
    
await mongoose.connect("mongodb+srv://girija:pRqLDnVQKqnjsGZm@cluster0.vk4swpk.mongodb.net/realEstate")
console.log("MongoDb is connected")

}
catch(error){
    throw error;
}
}

mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb connection disconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("Mongodb connection connected");
})
//middlewares
app.use(cors({
  origin:"https://realstateappg.onrender.com",
  methods : ["GET","POST","PUT","DELETE"]
}))
app.use(cookieParser())
app.use(express.json());

app.use("/api/property", propertyRoute);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000,()=>{
    connect()
    console.log("Server is running on port 5000")
})