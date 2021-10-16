import {Employee} from "../models"
import 'express-async-errors';
import notFoundError from '../utls/Errors/NotfoundError';
import badRequestError from '../utls/Errors/badRequestError';
import ApplicationError from "../utls/Errors/applicationError";
import AuthorizationError from "../utls/Errors/authorizationError"
import {
    hashPassword,
    generateToken,
    verifyToken,
    comparePassword
}from "../utls/auth"
import {
  getManager,
  getEmployeeByEmail
} from '../services/employeeServices';
import sendEmail from "../helper/sendEmail";

export const signUpManager = async (req, res) => {
  try {
    const managerExist = await getManager(req.body);
    if(managerExist.exist){
       throw new badRequestError((managerExist.message))
    }
    const password = hashPassword(req.body.password);
    const employee = await Employee.create({...req.body,password});
    const verifyToken = generateToken({email:employee.email,status:employee.status,position:employee.position},"2d");
    const useInfo={
      email:employee.email,
      subject:"Email confirmation email",
      body:`<h3>Awesomity Email confirmation</h3> </br><p>Hi ${employee.name} </br>Your email has been used to signup on Awesomity... Please click the button bellow to confirm this email, and if this was not you can ignore this email. the token will expire in two days(2 days)</p> </br> <a href=${process.env.BACKEND_URL}/api/v1/auth/verification?token=${verifyToken} style="text-decoration:none"><button style="color:white;background-color:#1e63bd"> Confirm Email</button></a>`
    }
    const email = await sendEmail(useInfo)
    res.status(201).json({ employee,messsage:"An email confirmation email was sent to the your email, Please go and confirm your email" });
  } catch (error) {
    res.status(500).json({ messsage:error.message });
  }
};

export const verification = async (req, res, next) => {
    const updateUser = async (email) => {
      try {
        const record = await getEmployeeByEmail(email);
        if (!record) {
          throw new notFoundError(('Account does not exist'));
        }
        if (record.status === "INACTIVE") {
            await Employee.update( {status:"ACTIVE"},{ where: { email } });
          return res.status(200).json({ status: 200, message: ('Email has been verified') });
        } 
        res.status(400).json({ status: 400, message: ('Account already verified') });
      } catch (error) {
        throw new ApplicationError()
      }
    };
    const decoded = await verifyToken(req.query.token)
    updateUser(decoded.email);
  };

export const login = async (req,res,next)=>{
    
    const { email, password } = req.body;
    const employee = await getEmployeeByEmail(email);

    if (employee === null) {
        throw new notFoundError((`You don't have an account with this email: ${email}`), 404);
    }

    if (employee.status === "INACTIVE") {
        throw new ApplicationError(('Please verify your email first'), 403);
    }

    if (employee.position !== "MANAGER") {
        throw new badRequestError(('You are not Allowed to Login into the System'), 400);
    }
    
    const result = comparePassword(password, employee.password);

    if (!result) throw new badRequestError(('Incorrect credentials'), 400);

    try {

        const userToken = await generateToken({email:employee.email,status:employee.status,position:employee.position});

        res.cookie('Login_Token', userToken,{
            httpOnly: true, 
            path: '/',
            sameSite: "strict"
        });

        return res.status(200).json({
            status: 200,
            message: ('login successful'),
            token: userToken
        });
    } catch (err) {

        next(err);
    }
}

export const logout = async (req, res) => {
    try {
      
      res.clearCookie('Login_Token', { path: '/' });
  
      res.status(200).json({ status: 200, message: ('Logout successful!') });

    } catch (error) {

        res.status(400).json(error.message);
    }
};


export const sendResetPasswordEmail = async (req, res, next) => {

    try {
      const { email } = req.body;
      const employee = await getEmployeeByEmail(email);
      if (!employee) return res.status(404).json({ status: 404, error: 'User not found' });
      if (employee.status!== "ACTIVE") return res.status(401).json({ status: 401, error: 'Account not Activated' });

      const resetToken = generateToken({email:employee.email,status:employee.status,position:employee.position});
  
      const userInfo = {
        email: email,
        subject: 'Reset your password',
        body: `<p>Hello, you requested to reset your password on Awesomity, Click on the link below to enter new password.</p> <br> <a href=${process.env.BACKEND_URL}/api/v1/auth/rest_password?token=${resetToken}><b>Reset password Link</b></a>`
      };
  
      const sentEmail = await sendEmail(userInfo)
  
      if(sentEmail){
        return res.status(200).json({ status: 200, message: 'Please check your email to reset your password' });
  
      }else{
        throw new ApplicationError("Failed to send the reset email, please try again!", 500);
      }
  
    } catch (error) {
      next(error);
    }
  };


export const verifyResetPassword = async (req, res, next) => {
    try {
        const { token } = req.query;

        const { password, confirmPassword } = req.body;
    
        const decodedToken = await verifyToken(token);

        if (decodedToken.email === undefined) throw new AuthorizationError(('Invalid Token'));

        if (password !== confirmPassword) throw new badRequestError(('Passwords do not match'));

        const record = await getEmployeeByEmail(decodedToken.email);

        if (!record) throw new notFoundError(('Account does not exist'));
        const newPassword = hashPassword(password);
        const updatePassword = await Employee.update( {password:newPassword},{ where: { email:decodedToken.email} });

        return res.status(200).json({ status: 200, message: ('Password reset successfully') });
      
    } catch (err) { 
        next(err)
     }
  };

