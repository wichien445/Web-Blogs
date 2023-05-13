//Connect Database
const slugify = require("slugify")
const Blogs = require("../models/blog")
const { v4: uuidv4 } = require('uuid');

//POST API
exports.create=(req,res)=>{
    const {title,content,author} = req.body
    let slug = slugify(title)

    //ถ้า Slug เป็นภาษาไทย
    if(!slug)slug = uuidv4();

    //validate data
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})
            break;
    }
    
    //Save Data
    Blogs.create({title,content,author,slug})
    .then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
         res.status(400).json({error:err})
    })
}

//GET ALL API
exports.getAllblogs=(req,res)=>{

    //Get All Data
    Blogs.find({})
    .then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
         res.status(400).json({error:err})
    })
}

//GET SINGLE DATA ตาม slug
exports.singleBlog=(req,res)=>{
    const {slug} = req.params
    Blogs.findOne({slug})
    .then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
         res.status(400).json({error:err})
    })
}

//REMOVE DATA
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndRemove({slug})
    .then((blog)=>{
        res.json({message: "ลบบทความเรียบร้อย"})
    })
    .catch((err)=>{
         res.status(400).json({error:err})
    })
}

//UPDATE DATA
exports.update=(req,res)=>{
    const {slug} = req.params
    const {title,content,author} = req.body
    Blogs.findOneAndUpdate({slug},{title,content,author},{new:true})
    .then((blog)=>{
        res.json(blog)
    })
    .catch((err)=>{
         res.status(400).json({error:err})
    })
}