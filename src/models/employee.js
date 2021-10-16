'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Employee.init({
    code:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true,
      allowNull:false
    },
    name: DataTypes.STRING,
    nationalId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    DOB: DataTypes.DATE,
    status: DataTypes.STRING,
    position: DataTypes.STRING
  }, {
    sequelize,
    schema: 'EMP',
    modelName: 'Employee',
  });
  return Employee;
};