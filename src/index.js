const express = require("express");
const app = express();
require("dotenv").config();
require("./utils/db");
const main_app = require("./app");

app.use(main_app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
