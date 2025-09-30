import jwt from "jsonwebtoken";
export const generateToken=(userId,res)=>{
const token=jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'3d',
}
)
res.cookie('token',token,{
    maxAge:3*24*60*60*1000,
    httpOnly:true,//prevent XSS client side js to access the cookie or cross site scripting attack

    sameSite:"strict",//csfr attack cross site request forgery attack
    
    secure:process.env.NODE_ENV !=="development",
});
return token;
}
