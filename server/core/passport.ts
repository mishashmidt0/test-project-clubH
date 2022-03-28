import GitHubStrategy from 'passport-github'
import passport from 'passport'

passport.use('github', new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    const fullName = profile.displayName || profile.username
    const avatar = profile.photos[0].value
    console.log('profile', profile);
    cb()
  }
));

export {passport}