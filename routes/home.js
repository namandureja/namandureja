const express = require("express");
const res = require("express/lib/response");
var admin = require("firebase-admin");
var serviceAccount = require("../secret.json");
const { getFirestore, FieldValue } = require('firebase-admin/firestore');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = getFirestore();

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

router.post('/submit',async (req,res)=>{
    const collectionRef = db.collection('suggestions').doc('ndureja');
    const unionRes = await collectionRef.update({
        query: FieldValue.arrayUnion({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        })
      });
    res.json({
        message: "Success"
    });
})
module.exports = router;