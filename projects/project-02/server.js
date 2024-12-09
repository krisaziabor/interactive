import dotenv from 'dotenv';
dotenv.config({ path: 'private.env' });
import express from 'express';
import cors from 'cors';
import { createConnection } from 'mysql2';
import { WorkOS } from '@workos-inc/node';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use(express.json());

const workos = new WorkOS(process.env.WORKOS_API_KEY, {
    clientId: process.env.WORKOS_CLIENT_ID,
});

const redirectUri = 
    process.env.NODE_ENV === 'production'
    ? process.env.PROD_REDIRECT_URI
    : process.env.DEV_REDIRECT_URI;

app.get('/login', (req, res) => {

    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
        provider: 'authkit',
        redirectUri: redirectUri,
        clientId: process.env.WORKOS_CLIENT_ID,
    });

    res.redirect(authorizationUrl);

});

app.get('/callback', async (req, res) => {

    const code = req.query.code;

    if (!code) {
        return res.status(400).send('No code provided');
    }

    try {
        const authenticateResponse =
            await workos.userManagement.authenticateWithCode({
                clientId: process.env.WORKOS_CLIENT_ID,
                code,
                session: {
                    sealSession: true,
                    cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
                },
            });
        
        const { user, sealedSession } = authenticateResponse;

        res.cookie('wos-session', sealedSession, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });

        return res.redirect('/');
        } catch (error) {
            return res.redirect('/login');
        }
});

async function withAuth(req, res, next) {
    const session = workos.userManagement.loadSealedSession({
        sessionData: req.cookies['wos-session'],
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const { authenticated, reason } = await session.authenticate();

    if (authenticated) {
        return next();
    }

    if (!authenticated && reason === 'no_session_cookie_provided') {
        return res.redirect('/login');
    }

    try {
        const { authenticated, sealedSession } = await session.refresh();

        if (!authenticated){
            return res.redirect('/login');
        }

        res.cookie('wos-session', sealedSession, {
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
        });

        return res.redirect(req.originalUrl);
        } catch (e) {
            res.clearCookie('wos-session');
            return res.redirect('/login');
        }
}

app.get('/dashboard', withAuth, async (req, res) => {
    const session = workos.userManagement.loadSealedSession({
        sessionData: req.cookies['wos-session'],
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const { user } = await session.authenticate();

    console.log(`User ${user.email} is logged in`);

    // Render the dashboard
    res.send('Dashboard');

});

app.get('/logout', async (req, res) => {
    const session = workos.userManagement.loadSealedSession({
        sessionData: req.cookies['wos-session'],
        cookiePassword: process.env.WORKOS_COOKIE_PASSWORD,
    });

    const url = await session.getLogoutUrl();

    res.clearCookie('wos-session');
    res.redirect(url);
});

var db = createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "kojoLEAGUE",
});

app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { app, db };