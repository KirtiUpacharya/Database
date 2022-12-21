const mongoose=require('mongoose')
const Schema=mongoose.schema
const EmployeeSchema=new Schema({
    name:{
        type:String
    },
    designation:{
        type:String
    },
    email:{
        type:String
    },
    age:{
        type:Number
    },
}, {timestamps:true})

const Employee=mongoose.model('Employee',EmployeeSchema)
module.exports=Employee