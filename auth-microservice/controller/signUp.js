const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
const ejs = require("ejs");
const path = require("path");
const sendMail = require("../utils/mailer");

const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    // Sending mail
    const templateFile = path.join(__dirname, "../views", "registration.ejs");
    const templateData = {
      userName: user.userName,
      verificationLink: "https://www.google.com",
    };
    const html = await ejs.renderFile(templateFile, templateData);
    sendMail("duttasudeep105@gmail.com", "Registration", null, html);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = signUp;
