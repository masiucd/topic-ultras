import {decrypt} from "./email-token";

export async function validateToken(token: string) {
  let params = new URLSearchParams(token);
  let t = params.get("token");
  if (!t) {
    return [null, null];
  }
  let decryptedToken = await decrypt(token);
  if (decryptedToken === null) {
    return [null, null];
  }

  return [t, decryptedToken] as [
    string,
    NonNullable<Awaited<ReturnType<typeof decrypt>>>
  ];
}
