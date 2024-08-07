const path =require('path');
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: "./config/config.env" });
const dbConnect = require("./config/db");
const corsOptions = require('./utils/corsOptions');
const cookieParser = require('cookie-parser');
const credentials = require('./middlewares/credentials');
const app = express();
const globalErrHandler = require("./middlewares/globalErrHandler");
const bodyParser = require('body-parser')


const port = process.env.PORT || 8000;

app.use(credentials);
app.use(cors(corsOptions));
// app.use(cors());
app.use(cookieParser());
//middleware


app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //pass incoming payload
app.use(morgan('dev'));

const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoutes");
const commentRouter = require("./routes/comments/commentRoutes");


//routing of users,posts,category,comments
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
// app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/comments", commentRouter);

//errorhandlers middleware
app.use(globalErrHandler);

//404 error

app.use("*", (req, res) => {
  res.status(400).json({
    message: `${req.originalUrl} Route not found`,
  });
});

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
  dbConnect()
});


