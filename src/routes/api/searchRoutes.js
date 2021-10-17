import express from "express";
import seachController from "../../controller/searchController";
import checkLogin from "../../middlewares/auth/checkUser";

const router = express.Router();

/**
 * @swagger
 *
 * /api/v1/search/:
 *    post:
 *      summary: the endpoint is used to search for an employee using his either his email,code and phone number
 *      description: The endpoint is used to search for an employee using his either his email,code and phone number.
 *      tags: [search Employee]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/search'
 *      responses:
 *        "200":
 *          description: Password reset successfully
 *          content:
 *            application/json:
 *              schema:
 *                result:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      code:
 *                          type: string
 *                      name: 
 *                          type: string
 *                      nationalId:
 *                          type: string
 *                      phoneNumber:
 *                          type: string
 *                      DOB:
 *                          type: Date
 *                      status:
 *                          type: string
 *                      createdAt:
 *                          type: Date
 *                      updatedAt:
 *                          type: Date
 *        "400":
 *          description:  Nothing found
 *
 * components:
 *    schemas:
 *      search:
 *        type: object
 *        required:
 *          - search
 *        properties:
 *           search:
 *             type: string
 *             example: MANAGER
 */
router.post("/", checkLogin, seachController)

export default router