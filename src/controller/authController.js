import {Employee} from "../models"
import 'express-async-errors';
import employeeNotFound from '../utls/Errors/NotfoundError';
import signUpError from '../utls/Errors/badRequestError';
import ApplicationError from "../utls/Errors/applicationError";
import {hashPassword,generateToken,verifyToken} from "../utls/auth"
import {
  getSingleEmployee,
  getAllEmployees,
  getManager,
  getEmployeeByEmail
} from '../services/employeeServices';
import sendEmail from "../helper/sendEmail";

export const signUpManager = async (req, res) => {
  try {
    const managerExist = await getManager(req.body);
    if(managerExist.exist){
      // return res.status(400).json({message:managerExist.message})
       throw new signUpError((managerExist.message))
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
      console.log(error)
    res.status(500).json({ messsage:error.message });
  }
};

export const verification = async (req, res, next) => {
    const updateUser = async (email) => {
      try {
        const record = await getEmployeeByEmail(email);
        if (!record) {
          throw new employeeNotFound(('Account does not exist'));
        }
        if (record.status === "INACTIVE") {
            await Employee.update( {status:"ACTIVE"},{ where: { email } });
          return res.status(200).json({ status: 200, message: ('Email has been verified') });
        } 
        throw new signUpError(('Account already verified'));
      } catch (error) {
        //next(error);
        throw new ApplicationError()
      }
    };
    const decoded = await verifyToken(req.query.token)
    // jwt.verify(req.query.token, process.env.TOKEN_SECRET, (err, user) => {
    //   if (err) throw new badRequest(('Invalid token'));
    //   updateUser(user.username);
    // });
    updateUser(decoded.email);
  };

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await  getAllEmployees();
    if (!employees) {
      throw new employeeNotFound(('No Employees found'));
    }
    res.status(200).json({ status: 200, employees });
  } catch (error) {
    res.status(500).json({ messsage:error });
  }
};

export const getEmployee = async (req, res, next) => {
  const { id } = req.params;
  try {
    const employee = await getSingleEmployee(id);
    if (!employee) {
      throw new employeeNotFound(('Employee does not exist'));
    }
    res.status(200).json({employee });
  } catch (error) {
    console.log(error)
    res.status(500).json({ messsage:error });
  }
};

export const activateEmployee =  async (req,res)=>{
  try {
    const employee = await Employee.findOne({where:{code:req.params.id}});
    if (!employee) {
      throw new employeeNotFound(('Employee does not exist'));
    }
    await Employee.update( {status:"ACTIVE"},{ where: { code: req.params.id } });
    res.status(201).json({ status: 201, message: 'Employee has been Activated' });
  } catch (error) {
    res.status(500).json({ messsage:error.message });
  }
}

export const suspendEmployee =  async (req,res)=>{
  try {
    const employee = await Employee.findOne({where:{code:req.params.id}});
    if (!employee) {
      throw new employeeNotFound(('Employee does not exist'));
    }
    await Employee.update( {status:"INACTIVE"},{ where: { code: req.params.id } });
    res.status(201).json({ status: 201, message: 'Employee has been Suspended' });
  } catch (error) {
    res.status(500).json({ messsage:error.message });
  }
}
export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({where:{code:req.params.id}});
    if (!employee) {
      throw new employeeNotFound(('Employee does not exist'));
    }
    const update = await Employee.update(req.body, { where: { code: req.params.id } });
    res.status(201).json({ status: 201, message: 'Accommodation successfully updated' });
  } catch (error) {
    res.status(500).json({ messsage:error });
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({where:{code:req.params.id}});
    if (!employee) {
      throw new employeeNotFound(('Employee does not exist'));
    }
    await Employee.destroy({ where: { code: req.params.id } });
    res.status(201).json({ status: 201, message: 'Employee has been Deleted' });
  } catch (error) {
    res.status(500).json({ messsage:error.message });
  }
};

