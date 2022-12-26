const { response } = require('express')
const { findByIdAndDelete } = require('../Model/Employee')
const Employee=require('../models/Employee')
const paginate=require(mongoose_paginate_v2)

//show the list of the Employee without pagination
const index=(req,res,next)=>{

     Employee.find()
     .then(response=>{
        res.json({response})
     })
    
     .catch(error=>{
        res.json({message: 'An error occured!'})
        })
     }

 //show the list of the Employee with pagination

 const index1=(req,res,next)=>{
 Employee.paginate({},{page:req.query.page,limit:req.query.limit}) //pass two parameters while tseting also,page and limit in query//http://localhost:3000/api/employee?page=1&limit=5
 .then(response=> {
    res.json({
        response
    })
 })
 .catch(error=>{
    res.json({
        message:"An error occured :" +error
    })
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

    if(req.file){
        let path=''
        req.files.forEach(function(files,index,arr){
        path=path+files.path+','
        })
        path=path.substring(0,path.lastIndexOf(",")) 
        //employee.avatar=req.file.path 
        employee.avatar=path
    }
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
