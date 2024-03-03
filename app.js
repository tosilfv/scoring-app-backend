const express = require("express");
const bodyParser = require("body-parser");
const coursesRoutes = require("./routes/courses-routes");
const PORT = 5000;

const app = express();
app.use("/api/courses", coursesRoutes);
app.listen(PORT);
