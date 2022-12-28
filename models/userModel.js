import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from "validator";

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true 
    }
})

//static singup method
userSchema.statics.signup = async function (email, password) {
    //validation 
    if(!email || !password) {
        throw Error('All fields must be filled!')
    }
    if(!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    const exists = await this.findOne({email})
    if (exists) {
        throw Error('Email is used')
    }
    // if(!validator.isStrongPassword(password)) {
    //     throw Error('Password not strong!')
    // }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    return user
}

//static login method
userSchema.statics.login = async function (email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled!')
    }
    const user = await this.findOne({email})
    if (!user) {
        throw Error('Incorrect email!')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Incorrect password!')
    }
    return user
}
export default mongoose.model('User', userSchema)