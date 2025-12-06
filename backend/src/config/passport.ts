import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import { generateToken } from '../utils/generateToken';
import dotenv from 'dotenv';

dotenv.config(); // safe to keep here also

console.log("GOOGLE CLIENT:", process.env.GOOGLE_CLIENT_ID); // DEBUG

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;

                if (!email) return done(new Error('No email provided'));

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {
                    user = await User.findOne({ email });

                    if (user) {
                        user.googleId = profile.id;
                        await user.save();
                    } else {
                        user = await User.create({
                            name: profile.displayName,
                            email,
                            googleId: profile.id,
                        });
                    }
                }

                const token = generateToken({
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role,
                });

                return done(null, { user, token });
            } catch (err) {
                done(err);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export default passport;