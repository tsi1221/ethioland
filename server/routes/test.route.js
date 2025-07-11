import jwt from "jsonwebtoken";
import express from "express";

export const shouldBeLoggedIn = (req,res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

export const shouldBeAdmin = (req,res,next)=>{
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
}