const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const DB_url = process.env.DB_CLOUD

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use("/api/v1/tasks", tasks);

// app.get('/api/v1/tasks')     --get all the tasks
// app.post('/api/v1/tasks/:id') --- create a new task
// app.get('/api/v1/tasks/:id')  --- get a task   ---get single task
// app.patch('/api/v1/tasks/:id')  --- update a task
// app.delete('/api/v1/tasks/:id')  --- delete a task

const port = 3000;

const start = async () => {
  try {
    await connectDB(DB_url)
      .then(() => {
        console.log("connected to db");
      })
      .catch((err) => {
        console.log(err);
      });
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {}
};

start();
