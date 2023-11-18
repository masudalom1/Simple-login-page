import express  from "express";
import  path from "path";
import mongoose from "mongoose";
//conest database with mongoDB
mongoose.connect("mongodb://localhost:27017",{dbName:"userdetails"}).then(()=>{
    console.log("Your database is connect with mongoDB");
}).catch((e)=>{
    console.log(e);
});

// schema
const userDetails=new mongoose.Schema({
    name:String,
    email:String
});
//schema for constact me section
const contactMe=new mongoose.Schema({
    name:String,
    email:String,
    message:String,
})
//model for userDetails
const User=mongoose.model("User",userDetails);
const Contact=mongoose.model("Contact",contactMe);



const app=express();
app.set("view engine","ejs");
app.use(express.static(path.join(path.resolve(),"public")));
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.render("Login")
})

app.get("/Home",(req,res)=>{
    res.render("Home");
})
app.post("/",async(req,res)=>{
    await User.create({name:req.body.name,email:req.body.email});
    res.redirect("/Home");
    
});




app.post("/Home",async(req,res)=>{
    await Contact.create({name:req.body.name, email:req.body.email, message:req.body.message});
    res.render("Thank");

})


app.listen(3000,()=>{
    console.log("server is running on port 3000");
});