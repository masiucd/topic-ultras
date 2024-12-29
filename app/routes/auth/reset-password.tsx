import {Form, Link, redirect} from "react-router";
import {z} from "zod";
import {getUserByEmail, updateUserPassword} from "~/.server/db/dao/users";
import {deleteExpire, getExpire} from "~/.server/db/redis";
import {hashPassword} from "~/.server/utils/password";
import PageWrapper from "~/components/page-wrapper";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead} from "~/components/ui/typography";
import {validateToken} from "~/lib/jwt/token-utils";
import {STATUS_CODE} from "~/lib/status-code";
import type {Route} from "./+types/reset-password";

export function meta() {
  return [
    {
      title: "Reset Password",
      description: "Reset Your Password Here",
    },
  ];
}

export async function loader({request}: Route.LoaderArgs) {
  let params = new URLSearchParams(request.url.split("?")[1]);
  let [token, decryptedToken] = await validateToken(params.get("token") ?? "");
  if (token === null || decryptedToken === null) {
    return redirect("/login");
  }

  let emailStoredInRedis = await getExpire(token);
  if (emailStoredInRedis === null) {
    return redirect("/login");
  }

  if (emailStoredInRedis !== decryptedToken.email) {
    return redirect("/login");
  }

  let user = await getUserByEmail(decryptedToken.email);
  if (user === null) {
    return redirect("/login");
  }
  return {
    status: 200,
    data: {
      email: decryptedToken.email,
    },
  };
}

let ResetPasswordSchema = z.object({
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
  email: z.string().email(),
});

export async function action({request}: Route.ActionArgs) {
  let body = await request.formData();
  let password = body.get("password");
  let confirmPassword = body.get("confirmPassword");
  let email = body.get("email");
  let result = ResetPasswordSchema.safeParse({
    password,
    confirmPassword,
    email,
  });
  if (!result.success) {
    return {status: STATUS_CODE.BAD_REQUEST, data: {error: "Invalid data"}};
  }
  if (result.data.password !== result.data.confirmPassword) {
    return {
      status: STATUS_CODE.BAD_REQUEST,
      data: {error: "Passwords do not match", success: false},
    };
  }

  // Update the user's password in the database
  let hashedPassword = await hashPassword(result.data.password);
  if (hashedPassword === null) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      data: {error: "Internal server error", success: false},
    };
  }
  let success = await updateUserPassword(hashedPassword, result.data.email);

  let token = new URLSearchParams(request.url.split("?")[1]).get("token");
  if (success && token) {
    // Delete the token from redis
    await deleteExpire(token);
    return {
      status: STATUS_CODE.OK,
      data: {error: null, success},
    };
  }

  return {
    status: STATUS_CODE.INTERNAL_SERVER_ERROR,
    data: {error: "Internal server error", success: false},
  };
}

export default function ResetPasswordRoute({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  return (
    <PageWrapper>
      <aside className="mb-5">
        <H1>Reset Password</H1>
        <Lead>Update your new password below</Lead>
      </aside>
      <Form method="post">
        <Label htmlFor="password">
          Password
          <Input type="password" name="password" required />
        </Label>
        <Label htmlFor="confirmPassword">
          Confirm Password
          <Input type="password" name="confirmPassword" required />
        </Label>
        <input type="hidden" name="email" value={loaderData.data.email} />
        <button type="submit">Reset Password</button>
      </Form>
      <div className="my-5 min-h-[5rem] ">
        {actionData?.data.success && (
          <div>
            <p>Password reset successfully.</p>
            <p>
              You can now <Link to="/login">login</Link> with your new password.
            </p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
