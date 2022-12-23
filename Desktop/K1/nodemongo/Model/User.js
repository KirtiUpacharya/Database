const mongoose=require('mongoose')
const schema=mongoose.schema

const UserSchema=new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password: {
        type:String
    }},{timestamps:true})
const User=mongoose.model('User',UserSchema)
module.exports=User//User is not the file name, its ithe model schema name