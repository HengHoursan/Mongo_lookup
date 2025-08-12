const express = require("express");
const connection = require("./util/mongoConnection");
const cors = require("cors");

const bookRoutes = require("./routes/book.route");
const bookCategoryRoutes = require("./routes/bookCategory.route");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/books", bookRoutes);
app.use("/api/bookCategories", bookCategoryRoutes);

connection();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
