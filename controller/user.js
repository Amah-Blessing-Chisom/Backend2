import student from "../Model/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
//REGISTER USER
export const createStudents = async (req, res) => {
    const {
        name, email,phoneNumber,password,country, state, 
    } = req.body
    try {
        //check if email exist
        const exist = await student.findOne({email})
        if (exist) return res.status(400).json
        ({message:"Email Already Exist"})
        //check if user name exist
        /*const userName = await student.findOne({username})
        if (userName) return res.status(400).json
        ({message:"User Name Already Exist"})*/

        //check if phone number exist
        const phone = await student.findOne({phoneNumber})
        if (phone) return res.status(400).json
        ({message:"phone Number Already Exist"})

//hash password

const salt =await bcrypt.genSalt(10)
const hashPassword = await bcrypt.hash(password,salt)

        //create user
        const students = await student.create({
            name,
            email,
            phoneNumber,
            password:hashPassword,
            country,
            state})
        return res.status(201).json({message:"Registration Successful", students})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server Error", error})
    }
}



//GET ALL STUDENTS 
export const getALLstudents = async(req, res) => {
    try {
        let students = await student.find().select
        ('-password')
        res.status(200).json(students)
    } catch (error) {
        res.status (500).json({message:"server Error", error})
    }
}
//login
export const loginUser = async (req, res) =>{
    //create payload
    const {email, password} = req.body
    try {
        //check user exist
        const user = await student.findOne({email})
        if(!user) return res.status(404).json({message:"Email Not Registered"})
            //compare password
        const isMatch = await bcrypt.compare(password,user.password )
        if(!isMatch ) return res.status(400).json
        ({message:"Incorrect Password"})

        const token = jwt.sign({id:user._id}, process.env.
SECRET_KEY, {expiresIn: '1hr'})
res.status(200).json({message:"login Successful", 
    token,
user:{
    id:user._id,
    name:user.name,
    email:user.email,
    phoneNumber:user.phoneNumber
}
})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//get user by id
export const getUserById = async (req, res) =>{
    const userId = req. params.id
    try {
        const user = await student.findById(userId).select
        ('-password')
        if(!user) return res.status(404).json({message:"User Not Found"})
            res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
        //UPDATE USERS
export const updateUser = async (req, res) => {
    let userId = req.params.id
    const {name, email, phoneNumber, password, country, state} =req.body

    try {
        let user = await student.findById(userId)
        if (!user) return res.status(404).json({message:"User Not Found"})

            //update only provides fields
            user.name = name || user.name
            user.email = email || user.email
            user.phoneNumber = phoneNumber || user.phoneNumber
            user.password = password || user.password
            user.country = country|| user.country
            user.state = state || user.state
            await user.save()
            res.status(200).json({

                message:"user Successfully Updated",
                user:{
                   id:user._id,
                   name:user.name,
                   email:user.email,
                   phoneNumber:user.phoneNumber,
                   country:user.country,
                   state:user.state

                }
            })
    } catch (error){
        res.status(500).json ({message:error.message})
    }
}

//delete user
export const deletUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await student.findById(userId)
        if (!user) return res.status(404).json({message:"User doesn't exist"})

            await user.deleteOne()
            res.status(200).json({message:"user deleted successfully"})
        
    } catch (error) {
        res.status
    }
}