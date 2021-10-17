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


/**
 * @swagger
 *
 * /api/v1/auth/signup/:
 *    post:
 *      summary: A route that allows a manager to sign up
 *      tags: [Manager signup]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/employee'
 *      responses:
 *        "201":
 *          description: An email confirmation email was sent to the your email, Please go and confirm your email
 *        "400":
 *          description: Account already exists
 *        "500":
 *          description: Signup was unsuccessful, try again
 *
 * components:
 *    schemas:
 *      employee:
 *        type: object
 *        required:
 *          - name
 *          - nationalId
 *          - email
 *          - password
 *          - phoneNumber
 *          - DOB
 *        properties:
 *           name:
 *             type: string
 *             description: Name of a Manager
 *             example: Manager_1
 *           nationalId:
 *             type: string
 *             description: Manager's National Id
 *             example: 119949847757675
 *           email:
 *             type: string
 *             description: Email of the Manager
 *             example: mangerexample@gmail.com
 *           password:
 *             type: string
 *             description: Password for of the manager
 *             example: mananagerPassword
 *           DOB:
 *              type: Date
 *              description: Date of birth of the manager
 *              example: 1-1-2000
 *
 */
router.post("/signup",signUpValidation, signUpManager);


/**
 * @swagger
 *
 * /api/v1/auth/verification/:
 *    patch:
 *      summary: This route allows a manager to verify his email for his/her account
 *      description: This endpoint is used when one is verifying their email.
 *      tags: [Email verification]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/token'
 *      responses:
 *        "200":
 *          description: Email is verified successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/verified'
 *        "400":
 *          description: The account is already verified
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/alreadyVerified'
 *        "404":
 *          description: The account does not exist
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/notFound'
 *        "500":
 *          description: Email verification failed, try again
 *          content:
 *            aplication/json:
 *              schema:
 *                $ref: '#/components/schemas/error'
 * components:
 *    schemas:
 *      token:
 *        type: string
 *        description: The token is used to verify the manager's account
 *        example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImZpcnN0X25hbWUiOiJBbWl
 *      verified:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          message:
 *            type: string
 *            description: Success message
 *        example:
 *          status: 200
 *          Message: Email has been verified
 *      alreadyVerified:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          message:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 400
 *          Error: Account already verified
 *      notFound:
 *        type: object
 *        properties:
 *          Status:
 *            type: integer
 *            description: The HTTP status code
 *          message:
 *            type: string
 *            description: The error message
 *        example:
 *          Status: 404
 *          Error: Account does not exist
 *      error:
 *        type: object
 *        properties:
 *          status:
 *            type: integer
 *            description: The HTTP status code
 *          error:
 *            type: string
 *            description: Application error
 *          example:
 *            status: 500
 *            error: application error
 */
router.patch("/verification", verification);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Login
 *     summary: Route allow managers to login with email and password
 *     parameters:
 *       - in: body
 *         name: login
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/login'
 *     responses:
 *        200:
 *         description: Login success
 *         schema:
 *           landing:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: Success message
 *               example: Login successful
 *             Token:
 *               type: string
 *               description: token used to access for protected routes
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzEsImZpcnN0X25hbWUiOiJBbWl
 *         400:
 *          description: User not Allowed to Login into the System 
 *          schema:
 *            notlogin:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: You are not Allowed to Login into the System, or Incorrect credentials
 *         403:
 *          description: User has to verify his email first
 *          schema:
 *            notlogin2:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 403
 *                message:
 *                  type: integer
 *                  example: Please verify your email first
 *          500:
 *            description: application error
 *            schema:
 *              $ref: '#/components/schemas/error'
 *                
 * components:
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: john@gmail.com
 *         password:
 *           type: string
 *           example: 12345
 */
router.post("/login", loginValidation, login);
/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     tags:
 *       - Logout
 *     summary: Route allow manager to regenerete access token
 *     responses:
 *       200:
 *         description: success data
 *         schema:
 *           logout:
 *           type: object
 *           properties:
 *             status:
 *               type: integer
 *               description: The http status code
 *               example: 200
 *             message:
 *               type: string
 *               description: success message
 *               example: logout successful
 *       400:
 *         description: login first
 *         schema:
 *           logout2:
 *              type: object
 *              properties:
 *                status:
 *                  type: integer
 *                  example: 400
 *                message:
 *                  type: string
 *                  example: Please login
 *       401:
 *         description: invalid token
 *         schema:
 *           log:
 *              type: object
 *              properties:
 *                  status:
 *                    type: integer
 *                    example: 201
 *                  message:
 *                    type: string
 *                    example: Invalid Token
 */
router.post("/logout", checkLogin,logout);

/**
 * @swagger
 *
 * /api/v1/auth/rest_password_request:
 *    post:
 *      summary: A route send an email  to the manager to reset his/her password
 *      tags: [request reset password]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/requestReset'
 *      responses:
 *        "200":
 *          description: The request is sent. Check email for verification
 *        "400":
 *          description: For sending wrong properties in the request
 *        "500":
 *          description: Failed to send a reset password email
 *
 * components:
 *    schemas:
 *      requestReset:
 *        type: object
 *        required:
 *          - email
 *        properties:
 *           email:
 *             type: string
 *
 */
router.post("/rest_password_request", resetPasswordValidation, sendResetPasswordEmail);

/**
 * @swagger
 *
 * /api/v1/auth/rest_password/:
 *    patch:
 *      summary: the endpoint used to provide a new password and reset the old password
 *      description: This endpoint is used when one is providing a new password to reset the old password.
 *      tags: [rest password]
 *      parameters:
 *        - in: query
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: The token is used to verify the user
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/resetPassword'
 *      responses:
 *        "200":
 *          description: Password reset successfully
 *          content:
 *        "400":
 *          description: Password not match
 *        "401":
 *          description: Invalid token
 *        "404":
 *          description: The account does not exist
 *        "500":
 *          description: Failed to reset the password
 *
 * components:
 *    schemas:
 *      resetPassword:
 *        type: object
 *        required:
 *          - password
 *          - confirmPassword
 *        properties:
 *           password:
 *             type: string
 *           confirmPassword:
 *             type: string
 */
router.patch("/rest_password", validateResetPassword, verifyResetPassword);

export default router