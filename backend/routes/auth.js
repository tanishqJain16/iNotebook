const express=require('express')
const router=express.Router()
const User=require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser')
const JWT_SECRET='itisasecret@$'

//ROUTE1:Create user
router.post('/createuser',[
    body('Email','enter valid email').isEmail(),
    body('name','enter valid name').isLength({ min: 3 }),
    body('password','enter valid password').isLength({ min: 5 }),
],async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    try{
    let user=await User.findOne({Email:req.body.Email})
    if(user)
    {
        return res.status(400).json({success,error:'user already exists.'})
    }
    //generating strong password
    const salt=await bcrypt.genSalt(10)
    const secpass=await bcrypt.hash(req.body.password,salt)

    //creating new user
    user=await User.create({
        name: req.body.name,
        password: secpass,
        Email:req.body.Email,
      })
    //   .then(user => res.json(user))
    //   .catch(err=>{console.log(err)
    // res.json({error:'enter valid email'})})
    const data={
        user:{
            id:user.id
        }
    }

    const authtoken=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,authtoken})
    }
    catch(error){
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})

//ROUTE2:Login user
router.post('/login',[
    body('Email','enter valid email').isEmail(),
    body('password','enter valid password').exists(),
],async (req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false
      return res.status(400).json({success, errors: errors.array() });
    }
    const {Email,password}=req.body
    try {
        let user=await User.findOne({Email})
        if(!user)
        {
            success=false
            return res.status(400).json({success,error:'Please enter correct credentials'})
        }
        const passwordcompare=await bcrypt.compare(password,user.password)
        if(!passwordcompare)
        {
            success=false
            return res.status(400).json({success,error:'Please enter correct credentials'})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET)
        success=true
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})

//ROUTE3:GetUser
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        const userid=req.user.id
        const user=await User.findById(userid).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('some error occurred')
    }
})
module.exports=router