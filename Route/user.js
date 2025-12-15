import express from "express";
import { createStudents, getALLstudents,loginUser,getUserById, updateUser, deletUser  } from "../controller/user.js";

const router = express.Router()
router.post('/register', createStudents)
router.get('/',getALLstudents)
router.post('/login', loginUser)
router.get('/:id', getUserById )
router.put('/update/:id', updateUser)
router.delete('/:id', deletUser)
export default router