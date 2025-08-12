import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const secret = process.env.JWT_SECRET || 'yoursecretkey';

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next();
  });
};

export const shouldBeAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const secret = process.env.JWT_SECRET || 'yoursecretkey';

  jwt.verify(token, secret, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    if (payload.role !== 'ADMIN') {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = payload;
    next();
  });
};
