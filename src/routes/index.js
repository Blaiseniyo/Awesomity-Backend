import express from 'express';
import employeeRoutes from "./api/employee"
import authRoutes from "./api/authRoutes"
const routes = express.Router();

routes.use('/employee', employeeRoutes);
routes.use('/auth', authRoutes);
export default routes;