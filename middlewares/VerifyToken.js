import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  const secret = process.env.JWT_SECRET || 'yoursecretkey';

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid!" });
    }

    req.userId = payload.userId;
    next();
  });
};
