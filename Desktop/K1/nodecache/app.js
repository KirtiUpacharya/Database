
const express = require('express');
//const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const redis = require('redis');
const cookieParser=require('cookie-parser');

// Create Redis Client
let client=redis.createClient();
//let client = redis.createClient();
client.on('connect',function(req,res,next)
{
  console.log("connected");
});

client.on('connect', function(){
  console.log('Connected to Redis...');
});

// Set Port
const port = 3000;

// Init app
const app = express();

// View Engine\
//app.engine('handlebars', exphbs({defaultLayout:'main'}));
//app.set('view engine', 'handlebars');

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

// methodOverride
app.use(methodOverride('_method'));

// Search Page
app.get('/', function(req, res, next){
  res.render('main.html');
});

 app.post('/searchuser',function(req,res,next){
  let id=req.body.id;// req.body stores the data from user entered in for or bddy


 })
 client.hGetAll(id,function(err,data)
 {
  if(!data)
  {
    res.send("not exiat in database");
  }else{
   data.id=id;
   res.render('details',{
    user:data
   });


  }

 });
 app.post('/user/adduserdatainredis',(req,res)=>
 {
 let id=req.body.id;
 let firstname=req.body.firstname;
 let email=req.body.email;
 client.hmset(id,[

  'firstname',firstname,
  'lastname',lastname,
  'email',email
 ],(err,data)=>{
  if(err)
  {
    res.render("s");

  }
  else
    {
       res.send("successfully updated");
       client.expire(id,20);//Redis can be set to expire the data 
       
    }
  }
);
 
//url qury// GET http://example.com/search?keyword=great-white
app.get('/search',(req,res)=>
{
console.log(req.query.keyword); //"great-white"

});

 app.delete('/',(req,res)=>
 {
  console.log(req.method);
 });
app.post('/login',(req,res)=>{
  req.headers('content-Type');
  req.header('user-agent');
  req.header('Authorization');
})


app.delete('/user/delete/:id',(req,res)=>{
  client.del(re.params.id);
  res.redirect('/');
}
);
app.listen(port, function(){
  console.log('Server started on port '+port);
 });
 

