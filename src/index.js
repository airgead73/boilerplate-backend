/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");

const { messagesRouter } = require("./messages/messages.router");

/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();

/**
 *  App Configuration
 */

 var whitelist = ['https://dpm-sandbox-api.herokuapp.com']
 var corsOptionsDelegate = function (req, callback) {
   var corsOptions;
   if (whitelist.indexOf(req.header('Origin')) !== -1) {
     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
   } else {
     corsOptions = { origin: false } // disable CORS for this request
   }
   callback(null, corsOptions) // callback expects two parameters: error and options
 }

app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use("/api", apiRouter);

apiRouter.use("/messages", messagesRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);
