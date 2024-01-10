const jwt= require("jsonwebtoken")
//const {blacklist}=require("../blacklist")
const auth=(req,res,next)=>{
        //for query write like this
         //const {token}=req.query
        //for header
        const token =req.headers.authorization?.split(" ")[1]
        if(token){
                try{
                const decoded=jwt.verify(token,"masai")
                if(decoded){
                        console.log(decoded);
                        req.body.userID=decoded.userID;
                       req.body.name = decoded.user
                        next();
                }else{
                        res.json({msg:"you are not authorised"})
                }
        }catch(err){
                res.json({msg:"you are not authorised"})
        }
}else{
        res.json({msg:"Please login!"})
}
}
module.exports={
auth
}