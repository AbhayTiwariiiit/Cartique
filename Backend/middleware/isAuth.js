import jwt from 'jsonwebtoken';
export const isAuth=async(req,res,next)=>{
    try{
        let token=req.cookies.token; //get token from cookies
        if(!token){
            return res.status(401).json({message: "token not found"});
        }
        //verify the token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "does not have valid token"});
        }
        req.userId=decoded.userId; //set userId in request object
        console.log("Decoded userId:", req.userId);
        next(); 
    }
    catch(error){
        console.log("Authentication Error");
        return res.status(500).json({message: "isAuth Error"});
    }
}