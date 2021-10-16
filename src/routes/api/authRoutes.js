import express from "express"
import { 
    signUpManager, 
    verification, 
    login,
    logout,
    sendResetPasswordEmail,
    verifyResetPassword
} from "../../controller/authController";
import { 
    signUpValidation,
    loginValidation,
    resetPasswordValidation,
    validateResetPassword
} from "../../middlewares/validations/authValidations";

import checkLogin from "../../middlewares/auth/checkUser";

const router =  express.Router()

router.post("/signUp",signUpValidation, signUpManager);

router.post("/verification", verification);

router.post("/login", loginValidation, login);

router.post("/logout", checkLogin,logout);

router.post("/rest_password_request", resetPasswordValidation, sendResetPasswordEmail);

router.patch("/rest_password", validateResetPassword, verifyResetPassword);

export default router