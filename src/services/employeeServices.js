import {Employee} from "../models";


export const getSingleEmployee = async (code)=>{
    try {
        const employee = await Employee.findOne({where:{code:code}})
        return employee
    } catch (error) {
        return null
    }
    
}

export const getAllEmployees = async ()=>{
    const employees = await Employee.findAll();
    return employees
}