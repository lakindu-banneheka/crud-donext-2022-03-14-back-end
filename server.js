const express=require("express");
const app = express();
const env = require("dotenv")
env.config();
const mongoose = require("mongoose")
const path = require('path')
const cors = require('cors')

// routes
const TaskRouter = require('./src/routes/UserRouter');

//connect database
mongoose.connect( process.env.MONGO_URL ,
    (error)=>{
        if(!error){
            console.log("DataBase Connected");
        }
        else{
            console.log(error);
        }
});

//middleware
app.use(cors());
app.use(express.json());

app.use('/api', TaskRouter);


app.listen( process.env.PORT ,(err)=>{
   if(!err){   
   console.log(`server is running in on port ${process.env.PORT}  `);
   }
});
