const express =require("express");
const {connection}=require("./db");
const {userRouter}=require("./routes/user.route");
const {noteRouter}=require("./routes/notes.route");
//const {auth}=require("./middleware/auth.middleware");
const cors=require("cors");

const app=express()

app.use(express.json());
app.use(cors())
app.get("/list",(req,res)=>{
        res.send({msg:"list of users"})
})
app.use("/users",userRouter);
app.use("/notes",noteRouter);
app.listen(8080,async()=>{
        try{
                await connection
                console.log("connected to db")
                console.log("Server is running at port 8080")
        }catch(err){
                console.log(err)
        }
})