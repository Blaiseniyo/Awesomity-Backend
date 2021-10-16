import {verifyToken} from "../../utls/auth"

const checkUser = (req, res, next) => {
    const token = req.cookies['Login_Token']
    if (!token) {
      return res.status(400).send({ message: "Please login" });
    }
    if (token) {
      try {
        const user = verifyToken(token);
        req.user = user;
        next();
      } catch (error) {
        return res.status(401).send({ message: "Invalid Token" });
      }
    }
  }

export default checkUser;