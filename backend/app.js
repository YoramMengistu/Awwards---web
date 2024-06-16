const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./router/auth");
mongoose
  .connect("mongodb://127.0.0.1/web-wonders")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(cors());
app.use(express.json());
app.use(require("morgan")("dev"));

app.use("/", userRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
