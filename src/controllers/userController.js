
import { userModel } from "../models/userModel.js"
import { signupValidation } from "../validator/userValidator.js"

export const getHome = (req, res) => {
    res.send("Homepage!")
}

export const getAbout = (req, res) => {
    res.send("This is About page!")
}

export const postUser = async (req, res) => {
    try{
        const {username, email, password} = req.body

        const {error} = signupValidation.validate({
            username,
            email,
            password
        })

        if(error) {
            res.status(400).json({
                message: error.details[0].message
            })
        }
    
        const newUser = await userModel.create({
            username,
            email,
            password
        })
        
        res.status(201).json({
            data: newUser,
            message: "User created successfully!"
        })

    }catch(err) {
        console.error(err)
        throw new Error(err)
    }
}