const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/customers", require("./routes/customers"));

app.listen(5000, () => console.log("Server running on port 5000"));
