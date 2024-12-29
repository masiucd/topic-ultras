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

export const authSessionV2 = async (
  request: Request
): Promise<{
  userId: string;
  commit: () => Promise<string>;
  destroy: () => Promise<string>;
  flash: (msg: string) => void;
  set: (value: string) => void;
  error?: string;
} | null> => {
  const session = await getSession(request.headers.get("Cookie"));
  let userId = session.get("userId");
  if (!userId) {
    return null;
  }

  const commit = async () => {
    return await commitSession(session);
  };

  const destroy = async () => {
    return await destroySession(session);
  };

  const flash = (msg: string) => {
    session.flash("error", msg);
  };

  const set = (value: string) => {
    session.set("userId", value);
  };

  let error = session.get("error");

  return {userId, commit, destroy, flash, set, error};
};
