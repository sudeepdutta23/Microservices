const User = require("../model/userSchema");
const sendMail = require("../utils/mailer");
const path = require("path");
const ejs = require("ejs");

const forgotUsername = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send username to user's email
    // ... (using nodemailer)
    const templateFile = path.join(__dirname, "../views", "forgotUserName.ejs");
    const templateData = { userName: user.username };
    const html = await ejs.renderFile(templateFile, templateData);
    sendMail("duttasudeep105@gmail.com", "Forgot Username", null, html);
    res.json({ message: "Username sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = forgotUsername;
