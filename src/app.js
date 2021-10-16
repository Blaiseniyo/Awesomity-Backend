import express from "express";
import cors from "cors";
import db from "./models/index";
import routes from "./routes/index";
import ApplicationError from "./utls/Errors/applicationError"
import "dotenv/config";
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use("/api/v1/",routes);

// welcome page
app.use("/",(req,res)=>{
    res.status(200).json({message:"Welcome to Awesomity Challange By Blaise Niyonkuru"})
})

// catch all 404 errors
app.all('*', (req, res, next) => {
    const err = new ApplicationError(('Page Requested not found'), 404);
    next(err);
  });

  // Throw an error if anything wrong happens
  app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ status: statusCode, error: err.message});
    // next(err);
  });

  //connecting to the DB
  db.sequelize.authenticate()
  .then(()=> console.log("Database connected..."))
  .catch((err)=> console.log(`Connection to database failed: ${err}}`))

  app.listen(PORT,()=> console.log(`Server is listenning on port ${PORT}`))