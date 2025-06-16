require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");

const connectDb = require("./utils/db"); // Database connection
const errorMiddleware = require("./middlewares/error-middleware"); // Error middleware

// Import routers
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const doctorRouter = require("./router/doctorRoutes");
const patientRouter = require("./router/patientRoutes");
const adminRouter = require("./router/adminRoutes");
const bodyParser = require('body-parser');
const appointmentRoutes = require('./router/appointmentRoutes');

const app = express();

app.use(express.json()); // Parse JSON
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/form", contactRouter); // Contact form routes
app.use("/api/doctors", doctorRouter); // Doctor-related routes
app.use("/api/patients", patientRouter); // Patient-related routes
app.use("/api/admins", adminRouter); // Admin-related routes
app.use('/api', appointmentRoutes);

// Error Handling Middleware
app.use(errorMiddleware);

// Start Server
const PORT = process.env.PORT || 5001;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`);
    console.log(`API Base: http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Database connection failed:", error.message);
});
