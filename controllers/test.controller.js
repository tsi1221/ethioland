import jwt from "jsonwebtoken";

export const shouldBeLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }
    req.user = user;
    next(); // or send success response if this is not middleware
  });
};

export const shouldBeAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    if (!payload.isAdmin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    req.user = payload;
    next(); // or send success response if not used as middleware
  });
};
