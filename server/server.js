require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const bodyParser = require('body-parser');

// Routers
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const doctorRouter = require("./router/doctorRoutes");
const patientRouter = require("./router/patientRoutes");
const adminRouter = require("./router/adminRoutes");
const appointmentRoutes = require("./router/appointmentRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // Change to live domains after deployment
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
  credentials: true,
}));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/patients", patientRouter);
app.use("/api/admins", adminRouter);
app.use("/api", appointmentRoutes);

// Error middleware
app.use(errorMiddleware);

// Database Connect
connectDb();

module.exports = app;