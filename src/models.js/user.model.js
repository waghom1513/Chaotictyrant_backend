import mongoose, {Schema} from "mongoose";
import { Jwt } from "jsonwebtoken"; 
import brypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true ,
        index : true,
    },
    email:{
        type :String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true ,
    },
    FullName:{
        type :String,
        required : true,
        trim : true ,
        index : true,
    },
    avatar:{
        type :String,  //cloudinary url
        required : true,
    },
    coverimage : {
        type : String,
    },
    watchHistory:{
        type : Schema.Types.ObjectId,
        ref: "video",
    },
    password : {
        type : String,
        required : [true, 'password is required']
    },
    refreshtokens :{
        type : String,
    }
},{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    this.password = brycpt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrpyt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function () {
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            FullName:this.FullName,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            FullName:this.FullName,

        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User" , userSchema)