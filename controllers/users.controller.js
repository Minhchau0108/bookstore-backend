const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email, password, confirmedPassword } = req.body;

    if (password !== confirmedPassword) {
      res.status(400).json({
        success: false,
        message: "Password and confirmed Password not match",
      });
    }
    const user = new User({ name, email, password });
    await user.save();
    const accessToken = await user.generateToken();

    res.status(201).json({
      success: true,
      data: user,
      token: accessToken,
      message: `User ${user.name} created!`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
const getCurrentUser = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  if (!user)
    return res.status(400).json({
      success: false,

      error: "User not found!",
    });
  return res.status(200).json({
    success: true,
    data: user,
    message: "Get current user successfully!",
  });
};
const updateUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findByIdAndUpdate(
      userId,
      { name: req.body.name },
      { new: true }
    );
    if (!user)
      return res.status(400).json({
        success: false,
        error: "User not found!",
      });
    return res.status(200).json({
      success: true,
      message: "Update user successfully!",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
module.exports = {
  createUser,
  getCurrentUser,
  updateUser,
};
