const { Router }=require("express");
const adminMiddleware=require("../middlewares/admin");
const router=Router();
const {Admin,Course}=require("../db")

router.post('/signup',async (req,res)=>{
   const username=req.body.username;
   const password=req.body.password;

   await Admin.create({
    username:username,
    password:password
   })
   
    res.json({
        message:'admin created successfully'
    })
   
})

router.post('/courses',adminMiddleware,async (req,res)=>{
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;

    const newcourse=await Course.create({
        title,
        description,
        imageLink,
        price
    });
    res.json({
        msg:"course created successfully",courseId:newcourse._id
    })
})

router.get('/courses',async (req,res)=>{
    const response=await Course.find({})
    res.json({
       courses:response
    })
})

module.exports=router;