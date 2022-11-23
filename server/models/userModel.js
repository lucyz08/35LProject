import mongoose from 'mongoose';
import Joi from 'joi';
import passwordComplexity from 'joi-password-complexity';

const userSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
})

export const UserProfile = mongoose.model('userprofile', userSchema);

export const validate = (data) => 
{
    const schema = Joi.object({
        username:Joi.string().required().label("Username"),
        password:passwordComplexity().required().label("Password")
    });
    return schema.validate(data)
}