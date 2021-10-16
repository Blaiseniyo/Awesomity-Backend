import Joi from 'joi';
import userBadRequest from '../../utls/Errors/badRequestError';

export const employeeValidation = (req, res, next) => {
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 17));
  const phoneNumberRegex =/^(078|073|079|072)\d{7}$/
  const nationIdRegex = /^[1-9]\d{15}$/
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "name can't be empty",
      "string.base": "Name must be a string",
    }),
    nationId: Joi.string().min(16).max(16).regex(nationIdRegex).required().messages({
      "string.base": "National Id must be string",
      "string.empty": "National Id id required",
      "string.min":"National Id must 16 character long",
      "string.max":"National Id must 16 character long",
      "string.pattern.base":
        "National Id must contain only numbers",
    }),
    phoneNumber: Joi.string().regex(phoneNumberRegex).required().messages({
      "string.base": "Phone Number must be string",
      "string.empty": "Please fill in employee's Phone number",
      "string.pattern.base":
        "Phone number must be a valid Rwandan Phone number",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    DOB: Joi.date().max(cutoffDate).required().messages({
      "date.empty":"Employee's date of birth is required",
      "date.base":"Employee's date of birth must be a date",
      "date.max":"Employee must be above 18 years old"
    }),
    status:Joi.string().valid('ACTIVE','INACTIVE').messages({
      "string.base": "status must be string",
      "string.empty": "Please fill in your Phone number",
      "string.valid":
        "status must be a either [INACTIVE or ACTIVE]",
    }),
    position: Joi.string().valid('MANAGER','DEVELOPER','DESIGNER','TESTER','DEVOPS').required().messages({
      "string.base": "status must be string",
      "string.empty": "Please fill in employee's position",
      "string.valid":
        "status must be a either [MANAGER or DEVELOPER or DESIGNER or TESTER or DEVOPS]",
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};

export const updateEmployeeValidation = (req, res, next) => {
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 17));
  const phoneNumberRegex =/^(078|073|079|072)\d{7}$/
  const nationIdRegex = /^[1-9]\d{15}$/
  const schema = Joi.object({
    name: Joi.string().messages({
      "string.empty": "name can't be empty",
      "string.base": "Name must be a string",
    }),
    nationId: Joi.string().min(16).max(16).regex(nationIdRegex).messages({
      "string.base": "National Id must be string",
      "string.empty": "National Id id required",
      "string.min":"National Id must 16 character long",
      "string.max":"National Id must 16 character long",
      "string.pattern.base":
        "National Id must contain only numbers",
    }),
    phoneNumber: Joi.string().regex(phoneNumberRegex).messages({
      "string.base": "Phone Number must be string",
      "string.empty": "Please fill in employee's Phone number",
      "string.pattern.base":
        "Phone number must be a valid Rwandan Phone number",
    }),
    email: Joi.string().email().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    DOB: Joi.date().max(cutoffDate).messages({
      "date.empty":"Employee's date of birth is required",
      "date.base":"Employee's date of birth must be a date",
      "date.max":"Employee must be above 18 years old"
    }),
    status:Joi.string().valid('ACTIVE','INACTIVE').messages({
      "string.base": "status must be string",
      "string.empty": "Please fill in your Phone number",
      "string.valid":
        "status must be a either [INACTIVE or ACTIVE]",
    }),
    position: Joi.string().valid('MANAGER','DEVELOPER','DESIGNER','TESTER','DEVOPS').messages({
      "string.base": "status must be string",
      "string.empty": "Please fill in employee's position",
      "string.valid":
        "status must be a either [MANAGER or DEVELOPER or DESIGNER or TESTER or DEVOPS]",
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};
