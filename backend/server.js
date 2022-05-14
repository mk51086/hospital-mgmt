if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const bp = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const db = process.env.MONGO_URI;

mongoose
  .connect(db)
  .then((result) =>
    app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`))
  )
  .catch((err) => console.log(err));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.use('/patients',require('./routes/patient/patient.route'));
app.use("/staff", require("./routes/staff/staff.route"));