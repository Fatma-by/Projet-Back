const jwt = require("jsonwebtoken");

async function checkAuth(req, res, next) {
  try {
    const token = Object.assign(req.headers).cookie?.split("=")[1];

    const decoded = jwt.decode(token, "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb");
    console.log(decoded);

    if (decoded == null) {
      return res.status(403).json({ message: "session expired" });
    } else if (decoded.exp && decoded.exp < Math.floor(Date.now()/1000)) {
      return res.status(403).json({ message: "session expired" });
    }

    // If you want to perform database operations with Mongoose, you can use the model here
    // For example: const user = await YourModel.findOne({ _id: decoded.userId });
  } catch (err) {
    console.error(err);
    // Handle errors if necessary
  }
  next();
}

module.exports = checkAuth;
