  const express=require('express')
  const mongoose=require('mongoose')
  const morgan=require('morgan') //log save
  const bodyparser=require('body-parser')
  const EmployeeRoute=require('../routes/employee')
  mongoose.connect('mongodb+srv://kirtiupacharya:<password>@cluster0.xn7x6ib.mongodb.net/test',{useNewUrlParser:true,useUnifiedTopology:true})
  const db=mongoose.connection;
  const upload=require('../middleware/upload')  
  const AuthRoute=require('../routes/auth.js')

  db.on('error',(err)=>{
    console.log(err)
  })

  db.once('open',()=>
  {
    console.log('Databse connection established')

  })
  /*
  const { MongoClient, ServerApiVersion } = require('mongodb');
  const uri = "mongodb+srv://kirtiupacharya:<password>@cluster0.xn7x6ib.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
  });
*/
const app=express();

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

app.use('/uploads', express.static('uploads'))


const port=process.env.port||3000;
app.listen(port,()=>
{
    console.log('server is running on port'+ port);
})

app.use('api/employee',EmployeeRoute)
app.use('/api',AuthRoute);