const express = require("express");
const app = express();
const path = require("path");
const cors = require('cors');
const morgan = require('morgan');

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config/key");

const mongoose = require("mongoose");
const { auth } = require("../server/middleware/auth");

mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true, 
    useFindAndModify: false
  }).then(() => console.log('GTC db Connected...')).catch(err => console.log(err));

app.use(cors())
app.use(morgan('dev'));

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(cookieParser());

// express handling headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/settings', require('./routes/setting'));
// app.use('/api/administration', require('./routes/administration'));
app.use('/uploads', auth, express.static('uploads'));

// Error handling
app.use((req, res, next) => {
  const error = new Error('url not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      success: false,
      error: {
          message: error.message,
          error: error
      },
      error_code: error.status || 500
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`GTC Server Listening on ${port}`)
});