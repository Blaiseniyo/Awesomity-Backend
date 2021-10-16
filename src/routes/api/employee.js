import express from 'express';
import {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee,
    updateEmployee,
    suspendEmployee,
    activateEmployee
} from "../../controller/employeeController"

import {
    employeeValidation,
    updateEmployeeValidation
} from "../../middlewares/validations/employeeValidator"

import checkLogin from "../../middlewares/auth/checkUser";
const router = express.Router();

router.post('/',checkLogin, employeeValidation, createEmployee);

router.get('/',checkLogin, getEmployees);

router.get('/:id',checkLogin, getEmployee);

router.delete('/:id',checkLogin, deleteEmployee);

router.patch('/:id',checkLogin,updateEmployeeValidation,updateEmployee);

router.post('/suspend/:id',checkLogin, suspendEmployee);

router.post('/activate/:id',checkLogin, activateEmployee);

export default router;