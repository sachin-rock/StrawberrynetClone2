const express = require("express");
const Cart = require("../models/cart.model");
const User = require("../models/user.model");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

// router.get("/", authenticate, async (req, res) => {
//   try {
//     Cart.countDocuments({}).exec((err, count) => {
//       if (err) {
//         res.send(err);
//         return;
//       }

//       res.send({ count: count });
//     });
//   } catch (err) {
//     return res.status(400).send({ message: err.message });
//   }
// });

router.get("/", authenticate, async (req, res) => {
    console.log("req.pa",req.user);
  try {
    var cart =await Cart.find({userId:req.user._id}).lean().exec();
    console.log(cart);
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(400).send({ message: err.message });
  }
});

router.post("/" ,authenticate,async (req, res) => {
    console.log(req.body);
    try{
        const cart = await Cart.create(req.body)
        return res.status(201).send(cart)
    }
    catch(err){
        return res.status(400).send(err)
    }
 
})


router.patch("/", authenticate, async (req, res) => {
  try {
      console.log(Cart);
   
    const cart = await Cart.updateOne({userId:req.user._id}, {$addToSet:{"prodId":req.body.prodId}}, {
        new: true,
      })
        .lean()
        .exec();

        return res.status(200).send(cart);

        // GroupChat.findByIdAndUpdate(req.body.roomId, {$addToSet:{usersIds:req.body.userId}},{safe: true, new:true},(err,room) => 
    

  } catch (err) {
    return res.status(400).send(err);
  }
});

module.exports = router;
