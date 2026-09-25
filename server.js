const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRoutes = require("./routes");

const app = express();

const PORT = 3000;


// Middleware

app.use(cors());

app.use(express.json());


// Test route

app.get("/", function(req, res) {

    res.json({
        message: "Task Manager API is running"
    });

});


// Task routes

app.use("/api/tasks", taskRoutes);


// Start server

app.listen(PORT, function() {

    console.log(`Server is running on http://localhost:${PORT}`);

});