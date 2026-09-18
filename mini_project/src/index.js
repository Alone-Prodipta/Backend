
import dotenv from "dotenv";
dotenv.config({
    path:'./.env'

});
import mongoose from "mongoose";
import connectDB from "./database/index.js";
import { DB_NAME } from "./constants.js";
import express from "express";
const app= express();

connectDB();
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
})();   //for cleanup purpose starting with ';'.