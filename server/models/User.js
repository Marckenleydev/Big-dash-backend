import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
firstname:{
    type:String,
    required:true,
   
},
lastname:{
    type:String,
    required:true,
    
  
},
email:{
    type:String,
    required:true,
   
    
},
phone:{
    type:String,
    default:""
    
    
},
password:{
    type:String,
    required:true,

},
isAdmin:{
    type:Boolean,
    default:true
},

address:{
    type:String,
    default:""
}

},{timestamps:true})



const User = mongoose.model("User", UserSchema)
export default User