import User from "../models/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";



export const registerUser =async(req,res)=>{

    const email = ({email:req.body.email});
    const findUser = await User.findOne(email);

    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser= new User({
            ...req.body,
            password: hash
        })

        if(!findUser){
            const user = await newUser.save()
            return res.status(200).json(user)
        }
        return res.status(501).json("this email already exist")
    } catch (error) {
        return res.status(500).json(error)
        
    }

}

export const loginUser = async(req,res)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user) return res.status(501).json("User not found")
        
        const isPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
        if (!isPassword ) return res.status(501).json("Wrong password")
        
        const token = jwt.sign(
            {id:user._id, isAdmin: user.isAdmin}, process.env.JWT
        )
        const {password, isAdmin, ...otherDetails}= user._doc

        res.cookie("access_token", token,{
            httpOnly:true
        })
        .status(200)
        .json({ details: { ...otherDetails }, isAdmin });
    } catch (error) {
        return res.status(500).json(error)
    }


}


export const updateUser = async(req,res,next)=>{

    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            {$set:req.body}, {new:true})
            res.status(200).json(user)
    }catch(error){
      next( res.status(500).json("user has been updated")) 

    }
}

export const deleteUser=async(req, res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getUser=async(req, res,next)=>{
    try{
       const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}

export const getAllUser=async(req, res,next)=>{
    try{
       const users = await User.find()
       return  res.status(200).json(users)
    }catch(error){
        next( res.status(500).json(error)) 

    }
}