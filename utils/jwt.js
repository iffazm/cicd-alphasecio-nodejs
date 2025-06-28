const jwt = require("jsonwebtoken");

const SECRET_KEY = "secretkey"; // ganti ke env variable kalau nanti mau lebih secure

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null;
  }
};
