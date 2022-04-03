
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const Cart = require("../models/cart.model");
const authenticate = require("../middleware/authenticate")
 
 //cart data
 router.post("/",authenticate,
  async (req,res) => {
    
    // req.body.userId = req.user._id;
    // console.log(req.body)
    try {
        // console.log("reqBody",req.body) 
        const products = await Cart.find({userId:req.user._id, prodId : req.body.prodId}).lean().exec();

        if(products.length != 0){
            res.status(400).send("product is already in the cart");
        }else{
            const cart = await Cart.create(req.body);
         res.status(200).send(cart);
        }
        
     } catch (error) {
        res.send(error.message); 
     }
 });

 router.get("/:id",authenticate, async (req,res) => {
    try {
        const cart = await Cart.find({"userId":req.params.id}).populate({path : "prodId",
    select : ["name","price","brand","image","count"]})
        .lean().exec();
        res.send(cart);
        
    } catch (error) {
        res.send(error.message);
        
    }
})

//using header
router.get("/",authenticate, async (req,res) => {
    // req.body.userId = req.userID;
    // console.log(req.userID)
    try {
        // console.log("userId",req.body.useId)
        // console.log(req.user._id)
        const cart = await Cart.find({userId:req.user._id}).populate([{path : "prodId",
        select : ["name","price","brand","image","count"]},{path:"userId",
        select :["name"]}]).lean().exec();
    

    
        res.send(cart);
        
    } catch (error) {
        res.send(error.message);
        
    }
});

router.patch("/:id",authenticate, async (req,res) => {
    
    try {
        const product = await Cart.findByIdAndUpdate(req.params.id,req.body,{new : true}).populate([{path : "prodId",
        select : ["name","price","brand","image","quantity"]},{path:"userId",
        select :["name"]}]).lean().exec();
        res.send(product);    
    } catch (error) {
        res.send(error.message)
    }
})

router.delete("/:id",authenticate, async (req,res) => {
    // console.log("hello")
    try {

        const product = await Cart.findOneAndDelete({"_id":req.params.id});
        res.send(product);
    } catch (error) {
        res.send(error.message);
    }
})

router.delete("/",authenticate, async (req,res) => {
    try {
        console.log("hello")
        const product = await Cart.deleteMany({"userId":req.user._id});
        res.send(product);
    } catch (error) {
        res.send(error.message);
    }
})


module.exports = router;