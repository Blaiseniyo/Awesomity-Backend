import express from "express"
import { signUpManager, verification} from "../../controller/authController"
import { signUpValidation} from "../../middlewares/validations/employeeValidator"

const router =  express.Router()

router.post("/signUp",signUpValidation,signUpManager);
router.post("/verification",verification)

export default router