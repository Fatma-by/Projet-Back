const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  console.log("Checking");
  try {
    const token = Object.assign(req.headers).cookie?.split("=")[1];

    const decoded = jwt.decode(token, "");

    if (decoded == null) {
      return res.status(403).json({ message: "login first" });
    } else if (decoded.exp && decoded.exp < Date.now()) {
      return res.status(403).json({ message: "session expired" });
    }

    // If you want to perform database operations with Mongoose, you can use the model here
    // For example: const user = await YourModel.findOne({ _id: decoded.userId });
  } catch (err) {
    // Handle errors if necessary
  }
  next();
}

module.exports = checkAuth;
