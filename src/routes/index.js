import express from 'express';
import employeeRoutes from "./api/employee"
import authRoutes from "./api/authRoutes"
import searchRoutes from "./api/searchRoutes"
const routes = express.Router();

routes.use('/employee', employeeRoutes);
routes.use('/auth', authRoutes);
routes.use('/search',searchRoutes)
export default routes;