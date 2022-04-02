import passport from 'passport';
import GitHubStrategy from 'passport-github'
import user from '../../models/user'

const use: any = user


passport.use('github', <passport.Strategy>new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID as string,
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        callbackURL: "http://localhost:5000/auth/github/callback"
    },
    async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
        console.log(profile)

        const obj = {
            id: profile.id,
            fullname: profile.displayName,
            avatarUrl: profile.photos?.[0].value,
            isActive: 0,
            username: profile.username,
            photo: '',
        };
        const User = await use.create(null, obj)
        console.log(User)
        cb();
    }
));
export {passport}

