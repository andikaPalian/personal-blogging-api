const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const app = express();
const port = 8000;

dotenv.config();
connectDb();
app.use(express.json());

app.use("/", require("./routes/article.routes"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});