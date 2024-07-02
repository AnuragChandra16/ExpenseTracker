const express=require('express');
const mongoose =require("mongoose");
const cors=require("cors");
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
//const categoryController = require('./controllers/categoryCtrl');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');

const app=express();

//connect to mongodb
mongoose.connect("mongodb+srv://anuragchandra1601:7w1V1yFlYG1bSEq6@expensetracker.80gvpvz.mongodb.net/?retryWrites=true&w=majority&appName=Expensetracker")
.then(()=>console.log("connected to mongodb"))
.catch(err=>console.log(err));
//cors config
const corsOptions={
    origin:["http://localhost:5173"],
};
app.use(cors(corsOptions));
//middlewares
app.use(express.json());//pass incoming json data
//routes
app.use("/",userRouter);
app.use("/",categoryRouter);
app.use("/",transactionRouter);
//error
app.use(errorHandler);
//start server
const PORT=process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server is running on this port ${PORT}`));