require("dotenv").config();
// write in hyper npx nodemon filename
// install express
const { request, response } = require("express");
const express = require("express");

// initialization
const booky = express();

// configure json
booky.use(express.json());

// microservices routers
const Books = require("./API/BOOK");

const Author = require("./API/AUTHOR");

const Publication = require("./API/PUBLICATION");

// intializing mangoose
const mongoose = require("mongoose");

// establish database connection
mongoose
  .connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
)
  .then(() => console.log("connection established!!!!!!!"));

  // initializing microservics
booky.use("/book",Books);
booky.use("/author",Author);
booky.use("/publication",Publication);

booky.listen(3000,() => console.log("it is working"));