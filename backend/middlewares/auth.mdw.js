import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({ error: "Access denied!" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(401).json({ error: "Invalid token" });

    req.user = user;
    next();
  });
}
