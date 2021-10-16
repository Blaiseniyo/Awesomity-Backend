import {Employee} from "../models";
import ApplicationError from "../utls/Errors/applicationError"

export const getSingleEmployee = async (code)=>{
    try {
        const employee = await Employee.findOne({where:{code:code}})
        return employee
    } catch (error) {
        return null
    }
    
}
export const getManager= async (body)=>{
    const {email,nationalId,phoneNumber} = body;
    try {
        const emailExist = await Employee.findOne({where:{email}})
        const phoneNumberExist = await Employee.findOne({where:{phoneNumber}})
        const nationalIdExist = await Employee.findOne({where:{nationalId}})
        if(emailExist) return {exist:true,message:"Email already exist"}
        if(phoneNumberExist) return {exist:true,message:"Phone Number already exist"}
        if(nationalIdExist) return {exist:true,message:"National Id already exist"}
        return false
    } catch (error) {
        throw new ApplicationError((''), 500);
    }
}
export const getAllEmployees = async ()=>{
    const employees = await Employee.findAll();
    return employees
}

export const getEmployeeByEmail =  async (email)=>{
    try{
        const employees = await Employee.findOne({where:{email}});
        return employees
    }catch(error){
        throw new ApplicationError((''), 500);
    }
    
}