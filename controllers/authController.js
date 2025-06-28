const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");

const users = []; // in-memory user store

exports.register = async (req, res) => {
  const { email, password } = req.body;

  // Cek apakah email sudah dipakai
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) return res.status(400).json({ error: "Email already used" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ email, password: hashed });

  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ error: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Invalid password" });

  const token = generateToken({ email: user.email }); // ✅ pakai dari utils
  res.json({ token });
};
