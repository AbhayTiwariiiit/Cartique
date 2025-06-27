import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
    try{
        let token=req.cookies.token;
        console.log("Token in adminAuth middleware:", token);
        if(!token) {
            return res.status(401).json({message: 'No token provided'});
        }
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifiedToken) {
            return res.status(401).json({message: 'Invalid token'});
        }
        console.log("Verified token:", verifiedToken);
        req.adminEmail= process.env.ADMIN_EMAIL;
        next();
    }
    catch(error){
        res.status(401).json({message: 'Invalid token'});
    }
}