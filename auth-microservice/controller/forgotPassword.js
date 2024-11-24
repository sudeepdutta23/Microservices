const User = require("../model/userSchema");
const sendMail = require("../utils/mailer");
const path = require("path");
const ejs = require("ejs");

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate password  reset token
    // ...
    // Send reset link to user's email
    // ...
    const templateFile = path.join(__dirname, "../views", "forgotPassword.ejs");
    const templateData = { userName: user.username, resetLink: "https://www.google.com" };
    const html = await ejs.renderFile(templateFile, templateData);
    sendMail(
      "duttasudeep105@gmail.com",
      "Forgot Password",
      null,
      html
    );
    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = forgotPassword;
