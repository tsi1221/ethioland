import express from "express";
import { shouldBeAdmin, shouldBeLoggedIn } from "../controllers/test.controller.js";

const router = express.Router();

router.get('/should-be-logged-in', shouldBeLoggedIn, (req, res) => {
  res.json({ message: "You are logged in!", user: req.user });
});

router.get('/should-be-admin', shouldBeLoggedIn, shouldBeAdmin, (req, res) => {
  res.json({ message: "You are an admin!", user: req.user });
});

export default router;
