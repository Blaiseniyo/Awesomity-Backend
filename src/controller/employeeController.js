import {Employee} from "../models"
import 'express-async-errors';
import employeeNotFound from '../utls/Errors/NotfoundError';
import {
  getSingleEmployee,
  getAllEmployees
} from '../services/employeeServices';
import sendEmail from "../helper/sendEmail";

export const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    const useInfo={
      email:employee.email,
      subject:"Added to a Company Employee list",
      body:`<h1>Awesemity Email</h1> </br><p>Hi ${employee.name} </br> You have added to the list of employee of Awesomity..</p>`
    }
    const email = await sendEmail(useInfo)
    res.status(201).json({ employee,email });
  } catch (error) {
   // next(error);
    res.status(500).json({ messsage:error });
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await  getAllEmployees();
    if (!employees) {
      throw new employeeNotFound(('No Employees found'));
    }
    res.status(200).json({ status: 200, employees });
  } catch (error) {
    //next(error);
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
    // next(error);
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
    // next(error);
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
    // next(error);
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
    // next(error);
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
    // next(error);
    res.status(500).json({ messsage:error.message });
  }
};

