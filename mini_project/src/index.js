
/*import dotenv from "dotenv";
dotenv.config({
    path:'./.env'

});
import mongoose from "mongoose";
import connectDB from "./database/index.js";
import { DB_NAME } from "./constants.js";
import express from "express";
import {app} from "./app.js";
const app= express();

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("Database connction failed!!!",err);
});
;(async () => {
    try
    {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error!!",(error)=>{
            console.log("Err: ",error);
            throw error;

        });
        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    }
    catch(error)
    {
        console.error("!!!error!!!!",error);
        throw error;
        
    }
})();   //for cleanup purpose starting with ';'.*/








import dotenv from "dotenv";
import connectDB from "./database/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("Database connection failed!!!", err);
  });