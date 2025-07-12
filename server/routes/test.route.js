import express from "express";
import { shouldBeAdmin,shouldBeLoggedIn } from "../controllers/test.controller";

const router = express.Router();


router.get('/should-be-logged-in',shouldBeLoggedIn,(req,res)=>{
    res.send("You are logged in");
});

router.get('/should-be-admin',shouldBeLoggedIn,shouldBeAdmin,(req,res)=>{
    res.send("You are an admin");
});

// export default router;
