const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).send(`Access Denied : No token provided!!!`);
  try {
    const decoded = jwt.verify(decryptJWT(token), process.env.JSONPRIVATEKEY);
    req.user = decoded;
    next();
  } catch ({ name }) {
    res.status(400).send(`${name} : Invalid token!!!`);
  }
};

module.exports = authMiddleware;
