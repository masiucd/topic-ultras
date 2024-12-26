import {useFetcher} from "react-router";
import {z} from "zod";
import {getUserByEmail} from "~/.server/db/dao/users";
import PageWrapper from "~/components/page-wrapper";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, H2, Label, Lead} from "~/components/ui/typography";
import {sendEmail} from "~/lib/send-email";
import {cn} from "~/lib/utils";
import type {Route} from "./+types/forgot-password";

export function meta() {
  return [
    {
      title: "Forgot Password",
      description: "Forgot Password",
    },
  ];
}

let ResetPasswordSchema = z.object({
  email: z.string().email(),
});

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  let {email} = ResetPasswordSchema.parse({email: body.get("email")});
  let user = await getUserByEmail(email);
  if (user !== null) {
    let {error} = await sendEmail(email);
    if (error) {
      console.error("error", error);
      return {status: 500, data: {error: "Internal server error"}};
    }
    return {status: 201, data: {message: "Reset email sent, check your inbox"}};
  }
  return {
    status: STATUS_CO,
    data: {
      message:
        "If email exists, you should get an email with instructions to reset your password \n Please check your email",
    },
  };
}

export default function ForgotPasswordRoute({
  actionData,
}: Route.ComponentProps) {
  let fetcher = useFetcher();
  let isSubmitting = fetcher.state !== "idle";
  return (
    <PageWrapper>
      <aside className="mb-5">
        <H1>Forgot Password</H1>
        <Lead>
          Enter your email address and we will send you a link to reset your
          password
        </Lead>
      </aside>
      <div className="md:max-w-xl md:p-2">
        <fetcher.Form method="post">
          <fieldset
            className={cn(
              "flex flex-col gap-2 rounded-md border-2 shadow md:p-2",
              isSubmitting ? "opacity-50" : "opacity-100"
            )}
            disabled={isSubmitting}
          >
            <legend>
              <H2 className="font-bold text-xl">Reset Your Password</H2>
            </legend>
            <Label htmlFor="email">
              Email
              <Input type="email" name="email" required />
            </Label>
            <Button type="submit" aria-disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Reset Email"}
            </Button>
          </fieldset>
        </fetcher.Form>
        <div className="min-h-[5rem]">
          {actionData?.status === 200 ||
            (actionData?.status === 201 && (
              <Lead>{actionData.data.message}</Lead>
            ))}
        </div>
      </div>
    </PageWrapper>
  );
}
