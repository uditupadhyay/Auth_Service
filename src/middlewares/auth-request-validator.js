const validateUserAuth=(req,res,next)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            data:{},
            message:"something went wrong",
            err:"email or pass missing in auth process"
        });
    }
    next();
}

const validateIsAdminRequest=(req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            data:{},
            message:"something went wrong",
            err:"user id is not given"
        });
    }
    next();
}
module.exports={validateUserAuth,validateIsAdminRequest};