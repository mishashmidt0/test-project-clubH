import passport from 'passport';
import GitHubStrategy from 'passport-github'


passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/auth/github/callback"
    },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
        console.log(accessToken, refreshToken, profile)

        const user = {
            fullname: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
        }
        cb();
    }
));
export {passport}

