require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const errorHandler = require('./middlewares/errorHandlerMiddleware');
const categoryRouter = require('./routes/categoryRouter');
const transactionRouter = require('./routes/transactionRouter');

const app = express();

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to mongodb"))
  .catch(err => console.log(err));

// cors config
const corsOptions = {
    origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

// middlewares
app.use(express.json());

// routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

// error
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running on this port ${PORT}`));
