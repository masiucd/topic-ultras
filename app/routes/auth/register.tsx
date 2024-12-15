import {Form, Link} from "react-router";
import {Button} from "~/components/ui/button";
import {Input} from "~/components/ui/input";
import {H1, Label, Lead} from "~/components/ui/typography";

export default function RegisterRoute() {
  return (
    <div>
      <aside className="mb-10 flex flex-col gap-1">
        <H1>Register as a new user</H1>
        <Lead>
          Already have an account?{" "}
          <Link
            className="underline transition-all duration-150 hover:opacity-45"
            to="/login"
          >
            Login
          </Link>
        </Lead>
      </aside>

      <div>
        <Form action="">
          <fieldset className="flex flex-col gap-2 p-2 shadow-2xl md:max-w-3xl">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input type="password" id="password" required />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input type="password" id="confirm-password" required />
            </div>
            <Button type="submit">Register</Button>
          </fieldset>
        </Form>
      </div>
    </div>
  );
}
