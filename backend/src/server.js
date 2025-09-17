const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Import routes
const authRoutes = require("./routes/auth");
const resumeRoutes = require("./routes/resume");

// ✅ Use routes
app.use("/auth", authRoutes);
app.use("/resume", resumeRoutes);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
    console.log("✅ MongoDB connected");
  })
  .catch((err) => console.error(err));
