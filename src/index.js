import dotenv from "dotenv";

dotenv.config ({
    path : './env'
})


import mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import express from "express"

const application = express()

import connectDB from "./Db/index.js"

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running ar port : 
        ${process.env.PORT}`);
    })
    app.on("error", () =>{
        console.log("ERROR",error);
        throw error
    })
})
.catch((err) => {
    console.log("MONGODB connection failed",err);
})


/*

;( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        application.on("error",()=> {
            console.log ("ERROR :",error )
            throw error
        })

        application.listen(process.env.PORT, ()=>{
            console.log(`App is listening on port ${
                process.env.PORT
            }`);
        })
    } catch(error) {
        console.error("ERROR : ",error)
    }
}) ()
*/