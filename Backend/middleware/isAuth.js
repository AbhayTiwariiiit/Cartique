import jwt from 'jsonwebtoken';
export const isAuth=async(req,res,next)=>{
    try{
        console.log("Incoming cookies:", req.cookies);
        console.log("Authorization header:", req.header("Authorization"));
        console.log("Computed req.userId:", req.userId);
        let token=req.cookies.token; //get token from cookies
        if(!token){
            return res.status(401).json({message: "token not found"});
        }
        //verify the token
        const decoded=await jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "does not have valid token"});
        }
        req.userId=decoded.id; //set userId in request object

        next(); 
    }
    catch(error){
        console.log("Authentication Error");
        return res.status(500).json({message: "isAuth Error"});
    }
}