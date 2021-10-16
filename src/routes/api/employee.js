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

const router = express.Router();

router.post('/',employeeValidation,createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee);
router.patch('/:id',updateEmployeeValidation,updateEmployee);
router.post('/suspend/:id', suspendEmployee);
router.post('/activate/:id', activateEmployee);

export default router;