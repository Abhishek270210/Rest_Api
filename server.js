const express=require("express");
const mongoose=require("mongoose");
const bodyParse=require("body-parser");
const ejs=require("ejs");

const app=express();

app.set('view engine',ejs);
app.use(bodyParse.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/apidb",{ useNewUrlParser: true ,useUnifiedTopology: true },(err)=>{
    if(err)
    console.log(err);
    else
    console.log("database is connected at port 27017 !!!");
});

const studentschema=new mongoose.Schema({
    name:String,
    roll_no:Number,
    phone:Number
}) 

const Student=mongoose.model('Student',studentschema);

app.get('/',(req,res)=>{
    Student.find((err,result)=>{
        if(!err)
        {
       res.send(result)
        }
       else
       {
          res.send(err);
       }
    })
})

app.post('/',(req,res)=>{
    const newStudent=new Student({name:req.body.name,roll_no:parseInt(req.body.roll_no),phone:parseInt(req.body.phone)});
    newStudent.save((err)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            console.log("successfully added the student by post request");
            res.send("successfully added the student by post request");
        }
    });
})

app.delete('/',(req,res)=>{
    Student.deleteOne({name:req.body.name},(err)=>{
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else{
            console.log("deleted successfully");
            res.send("delete success");
        }
    })
})

app.listen(3000,(req,res)=>{
    console.log("server is up at port 3000");
})