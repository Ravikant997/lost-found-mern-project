const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path"); // ✅ ADD THIS
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// 🔥 FRONTEND SERVE CODE (MOST IMPORTANT)
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));