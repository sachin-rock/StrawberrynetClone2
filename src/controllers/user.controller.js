const express = require("express");
const Admin = require("../models/user.model");
const Product = require("../models/product.model")
const authenticate = require("../middleware/authenticate");
const authorise = require("../middleware/autharise")

const router = express.Router();

router.get("/", authenticate, async (req, res) => {
//   if (req.email !== req.params.email) {
//     return res.status(400).send({ message: "err" });
//   } else {
  console.log("SSSSSSSSSSSSSSs",req.email);
    try {
      const admin = await Admin.find({ "email": req.email });
      return res.status(200).send(admin);
    } catch (err) {
      return res.status(400).send({ message: err.message,loggedIn:false });
    }
//   }
});


router.post("/addproduct", authenticate,authorise(["admin"]),async (req, res) => {
    try{
        const product = await Product.create(req.body)
        return res.status(201).send(product)
    }
    catch(err){
        return res.status(400).send({message : err.message})
    }
 
})



module.exports = router;
