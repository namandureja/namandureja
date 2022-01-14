const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
router.get('/',(req,res)=>{
    res.render("profile");
})

router.get('/projects',(req,res)=>{
    res.render("projects");
})

router.get('/experience',(req,res)=>{
    res.render("experience");
})

router.get('/contact',(req,res)=>{
    res.render("contact");
})

router.get('/resume',(req,res)=>{
    res.send("teri maa ki chut");
})
module.exports = router;