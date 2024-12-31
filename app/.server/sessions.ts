import {createCookieSessionStorage} from "react-router";

type SessionData = {
  userId: string;
};

type SessionFlashData = {
  error: string;
};

let {getSession, commitSession, destroySession} = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: "__session",
    sameSite: "lax", // CSRF protection
    httpOnly: true, // XSS protection
    domain: "localhost", // make sure to change this to your domain
    maxAge: 60 * 60, // 1 hour
    secrets: ["s3cr3t"], // sign and verify the session
    secure: process.env.env === "production", // only send the cookie over HTTPS
  },
});

export {getSession, commitSession, destroySession};
