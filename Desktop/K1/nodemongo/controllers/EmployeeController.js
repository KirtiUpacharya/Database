const { response } = require('express')
const { findByIdAndDelete } = require('../Model/Employee')
const Employee=require('../models/Employee')

//show the list of the Employee
const index=(req,res,next)=>{

     Employee.find()
     .then(response=>{
        res.json({response})
     })
    
     .catch(error=>{
        res.json({message: 'An error occured!'})
        })
     }
 // show single employee
    const show=(req,res,next)=>{
        let employeeId=req.body.employeeId
        Employee.findById(employeeId)
         .then(response=>
            {
                res.json({response})
            })
        .catch(error=>
            {
               res.json({meassage:"Couldn't find Employee"}) 
            })
    }

// Add Employee

    const store=(req,res,next)=>{
     let employee=new Employee({
       name:req.body.name,
       designation:req.body.designation,
       email:req.body.email,
       phone:req.body.phone,
       age:req.body.age
     })
    employee.save()
    .then(response=>{
        res.json({
            message:'Employee Adedd successfully'
        })
    })
    .catch(error=>{
        res.json({message:'Employee not added'})

    })
}

//update the employee
const update=(req,res,next)=>{
    let employeeId=req.body.employeeId
  //updated Data object
    let updateData={
       name:req.body.name,
       designation:req.body.designation,
       email:req.body.email,
       phone:req.body.phone,
       age:req.body.age
    }

Employee.findByIdAndUpdate(employeeId,{$set:updateData})
  .then(()=>{
    res.json({message:'Employee updated successfully'})
  })
  .catch(error=>{
   res.json({message:'An error occusred'})
  })
}

// Delete an Employee

const destroy=(req,res,next)=>{
    let employeeId=req.body.employeeId
    Employee.findByIdAndRemove(employeeId)
    .then(response=>{
        res.json({response})
    })
    .catch(error =>{
        res.json({message:'couldnt remove'})
    })
}
module.export={index, show, store, update, destroy}
