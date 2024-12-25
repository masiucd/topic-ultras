import fs from "node:fs/promises";
import {env} from "$/env";
import {Resend} from "resend";

export async function sendEmail(email: string) {
  let file = await getMailTemplateAsHtmlString();
  let html =
    file !== null
      ? file.replaceAll("{{ url }}", "http://localhost:4000/reset-password")
      : "";
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
