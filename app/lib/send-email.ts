import fs from "node:fs/promises";
import {env} from "$/env";
import {Resend} from "resend";
import {setExpire} from "~/.server/db/redis";
import {encrypt} from "./jwt/email-token";

export async function sendEmail(email: string) {
  let token = await encrypt(email);
  let ok = await setExpire({
    key: token,
    value: email,
    hours: 1,
  });

  if (ok !== "OK") {
    return {
      data: null,
      error: "Internal server error",
    };
  }

  let html = await setUrlForHtmlTemplate(token);
  if (html === null) {
    return {
      data: null,
      error: "Internal server error",
    };
  }
  const resend = new Resend(env.RESEND_API_KEY);
  const {data, error} = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: [email],
    subject: "Reset your password",
    html,
  });
  return {data, error};
}

async function getMailTemplateAsHtmlString() {
  let absolutePath = process.cwd();
  try {
    let file = await fs.readFile(
      `${absolutePath}/app/lib/mail-templates/temp.html`,
      "utf8"
    );
    return file;
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

async function setUrlForHtmlTemplate(token: string) {
  let file = await getMailTemplateAsHtmlString();
  if (file !== null) {
    return file.replaceAll(
      "{{ url }}",
      `http://localhost:4000/reset-password?token=${token}`
    );
  }
  return null;
}
