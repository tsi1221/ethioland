import express from 'express';
import { getUsers,getUser,updateUser,deleteUser} from '../controllers/user.controller.js';
import {verifyToken} from'../middlewares/VerifyToken.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id',verifyToken, getUser);
router.put('/:id',verifyToken, updateUser);
router.delete('/:id',verifyToken, deleteUser);



export default router;