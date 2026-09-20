const express = require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/user.routes");
const { CartRouter } = require("./routes/carts.routes");
const { ProductRouter } = require("./routes/products.routes");
const session = require("express-session");

const app = express();
require("dotenv").config();

const cors = require("cors");
app.use(cors({
  origin: [
    "https://agent-6aae2d09329918caa1951183--luci-store24.netlify.app",
    "http://localhost:5500" // for local development
  ],
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WELCOME TO THE LUCII STORE APP");
});

// Set up session (new code for google auth)
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(UserRouter);
app.use(ProductRouter);
app.use(CartRouter);

const jwt = require("jsonwebtoken"); // Make sure jwt is imported near the top if not already

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Generate the JWT token using the authenticated user from Passport
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    );

    // Redirect to your live Netlify frontend with the token and user parameters
    const frontendURL = process.env.FRONTEND_URL || "https://agent-6aae2d09329918caa1951183--luci-store24.netlify.app";
    res.redirect(`${frontendURL}/index.html?token=${token}&userId=${req.user._id}&name=${encodeURIComponent(req.user.name || '')}`);
  }
);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Running and Connected to DB");
  } catch (error) {
    console.log(error);
  }
});
