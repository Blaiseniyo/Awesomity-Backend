import express from "express";
import seachController from "../../controller/searchController";
import checkLogin from "../../middlewares/auth/checkUser";

const router = express.Router();

router.post("/", checkLogin, seachController)

export default router