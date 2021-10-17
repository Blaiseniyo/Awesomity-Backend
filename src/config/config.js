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