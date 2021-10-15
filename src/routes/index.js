import express from 'express';
import employeeRoutes from "./api/employee"
const routes = express.Router();

routes.use('/employee', employeeRoutes);
export default routes;