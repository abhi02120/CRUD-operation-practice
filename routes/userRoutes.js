const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/users", async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email }); //User.create({})
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Send the created user back as a response
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const {name, email} = req.body;
    console.log(name, email);
    const updatedUser = await User.updateOne({_id: id}, {name, email})
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.patch('/users/:id', async(req,res) =>{
//     const {id} = req.params;
//     const {name, age} = req.body;
//     const user = User.findById(id);
//     if(!user){
//         res.status(400).json({ message: 'User does not exist' });
//     }
//     const updatedUser = await User.findByIdAndUpdate({name, age},{new:true});

//     return res.status(200).json({user: updatedUser});

// })

module.exports = router;
