const express=require('express');
const router=express.Router();
const News=require("../models/News");

router.get('/news',async(req,res)=>{
    const news=await News.find().sort({date:-1});
    res.json(news);
});

router.post('/news',async(req,res)=>{
    const {title,image,description}=req.body;
    try{
        const newNews=new News({title,image,description});
        await newNews.save();
        res.status(201).json(newNews);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

module.exports=router;