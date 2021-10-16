import { Op } from "sequelize";
import {Employee} from "../models";


const seachController = async (req,res,next)=>{
    try {
        const {search} = req.body;
        const result =  await Employee.findAll({where:{[Op.or] : [
            // {code:search},
            {email:search},
            {phoneNumber:search},
            {position:search},
            {name:search}
        ]
    }})
        return res.status(200).json({result})
    } catch (error) {
        next(error)
    }
    
}

export default seachController;