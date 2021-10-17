const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Awesomity-Backend',
        version: '1.0.0',
        description:"Awesomity-Backend is an application that will help a manager to create add employees to the company, be able to manager them. It will alse allow a Manager to signup,login and logout of the system",
        license: {
          name: 'MIT',
          url: ''
        },
        contact: {
          name: 'Blaise Niyonkuru',
          url: '',
          email: 'blaiseniyonkuru12@gmail.com'
        },
        servers:[process.env.BACKEND_URL]
      },
      basePath: '/api/v1',
      schemes: [
        "https",
        "http"
      ]
     ,
      security: [{
        Login_Token: []
      }]
    },
    apis: ['src/routes/api/*.js']
  };
  export default options;
  