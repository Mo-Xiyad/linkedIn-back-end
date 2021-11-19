import userModel from "../services/users/schema.js";
import handler from "../services/users/handlers.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET_KEY, GOOGLE_CALLBACK_URL } =
  process.env;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET_KEY,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // if profile with email and goole_id !exists? create use : nothing

      //   console.log(profile);
      let user = await handler.checkFotAuthorizedUser(profile._json.sub);
      if (!user) {
        // console.log(exists);
        user = await handler.createGoogleUser(profile._json);
        console.log(`User is being created: ${profile._json}`);
      } else {
        console.log(`user already exists: ${profile._json}`);
      }

      return done(null, user);
    }
  )
);

export default passport;
