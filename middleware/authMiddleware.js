import jwt, { decode } from 'jsonwebtoken'
import user from '../Model/user.js'

export const protect = async (req, res, next) => {
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startWith("bearer")
    ){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await user.findById(decode.id).select("-password");
            next();
        } catch (error) {
            return res.status(401).json({message: "Not authorized, Invalid token"});
        }
    }
    if (!token) {
        return res.status(401).json({message: "Not authorized, Invalid token "});

    }
};