// instantiating the server
const express = require("express");
const app = express();

const routers = require("./routes/todo");
const dbConnect = require("./config/databse");
const cors = require("cors");

//loading config from .env file
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// middleware to parse json request body
app.use(express.json());

// adding cors middleware to facilitate communication between server(backend) and client(frontend) via requests and responses
const allowedOrigins = [
  "http://localhost:3000",
  "https://to-do-frontend-psi.vercel.app",
];
app.use(
  cors({
    origin: allowedOrigins, // front end path(url) from where the request will be made to the backend or server
    credentials: true,
  })
);

// default route
app.get("/", (req, res) => {
  res.send("<h1>Hello from server</h1>");
});

// mounting the routes
app.use("/api/v1", routers);

// CONNECTING TO DB
dbConnect();

// starting the server
app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`Listening on port ${PORT}`);
});
