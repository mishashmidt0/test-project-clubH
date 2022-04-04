import passport from 'passport';
import GitHubStrategy from 'passport-github'

const {user, Payment} = require('../../models');
type UserType = {
    id: number,
    fullname: string,
    avatarURL: string,
    isActive: number,
    username: string,
    photo: string,
}
passport.use('github', <passport.Strategy>new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/auth/github/callback"
    },
    async (accessToken: unknown, refreshToken: unknown, profile: any, done: any) => {
        try {
            const obj: UserType = {
                id: profile.id,
                fullname: profile.displayName,
                avatarURL: profile.photos?.[0].value,
                isActive: 0,
                username: profile.username,
                photo: '',
            };

            const findUser = await user.findOne({
                where: {
                    id: obj.id
                }
            });

            if (!findUser) {
                const User = await user.create(obj)
                return done(null, User.toJSON());
            }

            return done(null, findUser);

        } catch (err) {
            done(err);
            console.log(err, "!ERROR!")
        }

    }
));

passport.serializeUser(function (user: any, done) {
    done(null, user.id);
});


passport.deserializeUser(function (id, done) {
    user.findById(id, function (err: any, user: any) {
        err
            ? done(err)
            : done(null, user);
    });
});


export {passport}

