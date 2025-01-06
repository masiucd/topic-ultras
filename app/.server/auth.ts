import {env} from "$/env";
import jwt from "jsonwebtoken";
import {createCookieSessionStorage} from "react-router";
import {z} from "zod";
import {getUserByEmail, getUserById} from "./db/dao/users";
import {comparePassword} from "./utils/password";

let TokenPayloadSchema = z.object({
  userId: z.string(),
  email: z.string(),
});

type TokenPayload = z.infer<typeof TokenPayloadSchema>;

type SessionFlashData = {
  error: string;
};

let refreshTokenSession = createCookieSessionStorage<
  {refreshToken: string},
  SessionFlashData
>({
  cookie: {
    name: "refresh_token",
    httpOnly: true, // XSS protection
    sameSite: "lax", // CSRF protection
    domain: "localhost", // make sure to change this to your domain
    maxAge: 60 * 60, // 1 hour
    secrets: [env.SESSION_SECRET], // sign and verify the session
    secure: process.env.env === "production", // only send the cookie over HTTPS
  },
});

let accessTokenSession = createCookieSessionStorage<
  {accessToken: string},
  SessionFlashData
>({
  cookie: {
    name: "access_token",
    httpOnly: true, // XSS protection
    sameSite: "lax", // CSRF protection
    domain: "localhost", // make sure to change this to your domain
    maxAge: 15 * 60, // 15 minutes
    secrets: [env.SESSION_SECRET], // sign and verify the session
    secure: process.env.env === "production", // only send the cookie over HTTPS
  },
});

// short-lived access token
function generateAccessToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, {expiresIn: "15m"});
}

// long-lived refresh token
function generateRefreshToken(payload: TokenPayload) {
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, {expiresIn: "1h"});
}

function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
}

function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
}

export async function authenticateUser(email: string, password: string) {
  let user = await getUserByEmail(email);
  if (!user) throw new Error("Invalid email or password");

  let isValidPassword = await comparePassword(password, user.password);
  if (!isValidPassword) throw new Error("Invalid email or password");

  let payload = TokenPayloadSchema.parse({
    userId: user.id.toString(),
    email: user.email,
  });
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

export async function login(email: string, password: string) {
  let {accessToken, refreshToken} = await authenticateUser(email, password);
  let refreshSession = await refreshTokenSession.getSession();
  let accessSession = await accessTokenSession.getSession();
  refreshSession.set("refreshToken", refreshToken);
  accessSession.set("accessToken", accessToken);
  return {
    accessToken,
    headers: {
      "Set-Cookie": await refreshTokenSession.commitSession(refreshSession),
      Authorization: await accessTokenSession.commitSession(accessSession),
    },
  };
}

export async function refreshAccessToken(refreshToken: string) {
  try {
    let payload = verifyRefreshToken(refreshToken);
    let user = await getUserById(Number.parseInt(payload.userId, 10));
    if (!user) throw new Error("Invalid refresh token");

    let newPayload = TokenPayloadSchema.parse({
      userId: user.id.toString(),
      email: user.email,
    });
    return {
      accessToken: generateAccessToken(newPayload),
      refreshToken: generateRefreshToken(newPayload),
    };
  } catch (error) {
    console.error(error);
    return;
  }
}

// Middleware authentication
export async function authenticateRequest(request: Request) {
  let refreshSession = await refreshTokenSession.getSession(
    request.headers.get("Cookie")
  );
  let accessSession = await accessTokenSession.getSession(
    request.headers.get("Authorization")
  );
  let refreshToken = refreshSession.get("refreshToken");
  let accessToken = accessSession.get("accessToken");

  // console.log(request.headers);
  console.log(request.headers);

  if (!refreshToken) {
    return {
      accessToken: null,
    };
  }

  // let accessToken = request.headers;

  // try {
  //   let accessToken = request.headers.get("Authorization")?.split(" ")[1];
  //   if (accessToken) {
  //     try {
  //       verifyAccessToken(accessToken);
  //       return {accessToken};
  //     } catch (error) {
  //       //
  //     }
  //   }
  // } catch (error) {
  //   //
  // }
}
