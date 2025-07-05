import express from "express";
import  {togglePinQuestion ,updateQuestionNote,addQuestionToSession} from "../controllers/questionControllers.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.route('/add').post(verifyJWT,addQuestionToSession);
//question's id 
router.route('/:id/pin').post(verifyJWT,togglePinQuestion);
router.route('/:id/note').post(verifyJWT,updateQuestionNote);

export default router 