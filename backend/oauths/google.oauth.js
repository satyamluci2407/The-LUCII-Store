require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { userModel } = require("../models/users.model");
const passport = require("passport");
const { v4: uuidv4 } = require("uuid");

const backendURL =
  process.env.BACKEND_URL || "https://the-lucii-store.onrender.com";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${backendURL}/auth/google/callback`,
      },
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const email =
            profile.emails && profile.emails[0]
              ? profile.emails[0].value
              : profile._json.email;
          const name = profile.displayName || profile._json.name || "Google User";

          let user = await userModel.findOne({ email });

          if (!user) {
            user = new userModel({
              name,
              email,
              password: uuidv4(),
            });
            await user.save();
          }
          return cb(null, user);
        } catch (err) {
          console.error("Google Strategy Error:", err);
          return cb(err, null);
        }
      }
    )
  );
} else {
  console.warn(
    "WARNING: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing. Google OAuth is disabled."
  );
}

module.exports = { passport };
