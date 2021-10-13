require('dotenv').config();

module.exports = {
  development: {
    use_env_variable:"Dev_DB_URL",
    database:"",
    host: "",
    port: "",
    dialect: 'postgres',
    operatorsAliases: 0,
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    operatorsAliases: 0,
    logging: false,
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false
    //   }
    // }
  },
  test: {
    use_env_variable:"Test_DB_URL",
    database: "",
    password: "",
    username: "",
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }

  },
  production: {
    use_env_variable:"Prod_DB_URL",
    database: "",
    password: "",
    username: "",
    dialect: 'postgres',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_data',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

// {
//   "development": {
//     "use_env_variable": "",
//     "username": "root",
//     "password": null,
//     "database": "database_development",
//     "host": "127.0.0.1",
//     "dialect": "postgres",
//     "operatorsAliases": 0,
//     "seederStorage": "sequelize",
//     "seederStorageTableName": "sequelize_data",
//     "logging": false
//   },
//   "test": {
//     "use_env_variable": "",
//     "username": "root",
//     "password": null,
//     "database": "database_test",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   },
//   "production": {
//     "use_env_variable": "",
//     "username": "root",
//     "password": null,
//     "database": "database_production",
//     "host": "127.0.0.1",
//     "dialect": "mysql"
//   }
// }