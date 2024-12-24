import {Form} from "react-router";
import {Input} from "~/components/ui/input";
import {Label} from "~/components/ui/typography";

export default function ResetPasswordRoute() {
  return (
    <div>
      <h1>Reset Password</h1>
      <Form method="post">
        <Label htmlFor="password">
          Password
          <Input type="password" name="password" required />
        </Label>
        <Label htmlFor="confirmPassword">
          Confirm Password
          <Input type="password" name="confirmPassword" required />
        </Label>
        <button type="submit">Reset Password</button>
      </Form>
    </div>
  );
}
