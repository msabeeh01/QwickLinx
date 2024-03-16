const Users = require("../models/User");

// auth libraries
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const secretKey = process.env.JWT_SECRET || "secret";

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const createToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "1d" });
};

//only meant for actual protected routes implementation, not required currently
const verifyToken = (token) => {
  return jwt.verify(token, secretKey);
};

const Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await encryptPassword(password);
    const newUser = new Users({ email, password: hashedPassword });
    await newUser.save();
    const token = createToken(newUser._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isPasswordCorrect = await verifyPassword(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createOrder = async (req, res) => {
  const { token, address, products } = req.body;

  console.log(req.body);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!address) {
    return res.status(400).json({ message: "Address required" });
  }
  if (!products) {
    return res.status(400).json({ message: "Products required" });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // save order under User
  const order = { address, products };

  await Users.findOneAndUpdate({ _id: user.id }, { $push: { orders: order } });

  res.status(201).json({ message: "Order created" });
};

const getOrders = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const orders = await Users.findOne({ _id: user.id }).populate("orders");
  res.status(200).json({ orders });
};

const deleteOrder = async (req, res) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id } = req.params;
  // delete order from User
  await Users.findOneAndUpdate({ _id: user.id }, { $pull: { orders: { _id: id } } });
  res.status(200).json({ message: "Order deleted" });
};

module.exports = { Register, Login, createOrder, getOrders, deleteOrder };
