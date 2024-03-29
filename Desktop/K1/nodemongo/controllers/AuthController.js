const User=require('../models/User')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const register=(req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hashedPass){

        if(err){
            res.json({

                error:err
            })
        }
        let user=new User({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashpassed
        })
        user.save()
    .then(user=>{
        res.json({message:'User Added Successfully'})
    })
    .catch(error=>{
        res.json({message:'An error occured'})
    })
    })    
}

const login=(req,res,next)=>{
    var username=req.body.username
    var password=req.body.password

    User.findOne({$or:[{email:username},{phone:username}]})
    .then (user=>{
        if(user){
       bycrypt.compare(password,user.password,function(err,result){
        if(err)
        {
            res.json({error:err})
        }
        if(result){
            let token=jwt.sign({name:user.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn:'30s'})
            let Refreshtoken=jwt.sign({name:user.name},process.env.Refreshtoken,{expiresIn:'48h'})
            res.json({
                message:'Login Successful',
                token
            })
        }else{
            res.json({
                message:'password doesnt matched'
            })
        }
       })

        }else{
            res.json({message:'No User found'})
        }
    })
}

const refreshtoken=(req,res,next)=>{
    const refreshtoken=req.body.refreshtoken
    jwt.verify(refreshtoken, 'refreshtokensecret',function(err,decode){
        if(err){
            res.status(400).json({
                err
            })
        }else{
            let token=jwt.sign({name:decode.name},'thesecrettoken',{expiresIn:'60s'})
            let refreshtoken=req.body.refreshtoken
            res.status(200).json({
                message:"Token refreshed successfully",
                token,
                refreshtoken
            })
        }
    } )
    /*let token=jwt.sign({name:user.name},'verySecretValue',{expiresIn:'30s'})
            let Refreshtoken=jwt.sign({name:user.name},'refreshtokensecret',{expiresIn:'48h'})
            res.json({
                message:'Login Successful',
                token
            })
        }else{
            res.json({
                message:'password doesnt matched'
            })
        }
       })

        }else{
            res.json({message:'No User found'})
        }*/
}
module.exports={register,login}