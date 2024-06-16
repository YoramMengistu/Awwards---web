const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);

    // creating new user
    const newUser = await new User({ username, email, password: hashPass });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: `Server Error: ${err}` });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });

    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { _id: user._id, email: email },
      process.env.JWT_SECRET
    );
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: `Server Error:${err.message}` });
  }
};

module.exports = {
  register,
  login,
};
