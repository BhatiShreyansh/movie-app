const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. User Register (Signup)
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check karo ki email pehle se toh nahi hai
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Password ko Hash (Secure) karna
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Naya user banao password ko hash karke
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User Registered Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2. User Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check karo email hai ya nahi
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Password match karo
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Password!" });
    }

    // Digital Pass (JWT Token) generate karo
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' } // 1 din ke baad login expire ho jayega
    );

    res.status(200).json({ 
      message: "Login Successful!", 
      token, 
      user: { name: user.name, email: user.email, role: user.role } 
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { register, login };
