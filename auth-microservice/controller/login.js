const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          error: "Invalid credentials",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET , {
        expiresIn: "1h",
      });
      res.json({ 
        data: { token, user },
        message: "Login successfully!"
    });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  module.exports = login;