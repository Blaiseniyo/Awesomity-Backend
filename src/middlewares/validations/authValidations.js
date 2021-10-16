import Joi from 'joi';
import userBadRequest from '../../utls/Errors/badRequestError';

export const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.empty": "Email can't be empty",
      "string.email": "Invalid email",
      "string.base": "Email must be a string",
    }),
    password:Joi.string().min(4).required().messages({
        "string.base": "Password must be string",
        "string.empty": "Password Is required",
        "string.min":"Password must atleast 4 characters long"
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};

export const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required().messages({
        "string.empty": "Email can't be empty",
        "string.email": "Invalid email",
        "string.base": "Email must be a string",
      })
    });
    const { error } = schema.validate(req.body);
    if (error) {
      throw new userBadRequest(error.details[0].message);
    }
    next();
  };
export const validateResetPassword = (req, res, next) =>{
    const pass = req.body.password
    const schema = Joi.object({
    password: Joi.string().min(4).required().messages({
        "string.base": "Password must be string",
        "string.empty": "Password Is required",
        "string.min":"Password must atleast 8 characters long",
    }),
    confirmPassword: Joi.string().min(4).required().messages({
        "string.base": "ConfirmPassword must be string",
        "string.empty": "ConfirmPassword Is required",
        "string.min":"ConfirmPassword must atleast 8 characters long"
    }),
    });
    const { error } = schema.validate(req.body);
    if (error) throw new userBadRequest(error.details[0].message);
    next();
}

export const signUpValidation = (req, res, next) => {
  const now = Date.now();
  const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 17));
  const phoneNumberRegex =/^(078|073|079|072)\d{7}$/
  const nationIdRegex = /^[1-9]\d{15}$/
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "name can't be empty",
      "string.base": "Name must be a string",
    }),
    nationalId: Joi.string().min(16).max(16).regex(nationIdRegex).required().messages({
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
    position: Joi.string().valid('MANAGER','DEVELOPER','DESIGNER','TESTER','DEVOPS').messages({
      "string.base": "status must be string",
      "string.empty": "Please fill in employee's position",
      "string.valid":
        "status must be a either [MANAGER or DEVELOPER or DESIGNER or TESTER or DEVOPS]",
    }),
    password:Joi.string().min(4).required().messages({
      "string.base": "Password must be string",
      "string.empty": "Password Is required",
      "string.min":"Password must atleast 4 characters long"
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new userBadRequest(error.details[0].message);
  }
  next();
};
