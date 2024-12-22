import {z} from "zod";
import {getUserByEmail} from "../db/dao/users";
import {comparePassword} from "../utils/password";

export async function login(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null,
  flashError: () => void
) {
  let result = LoginSchema.parse({email, password});
  // if (!result.success) {
  //   return ({
  //     status: 400,
  //     data: {
  //       user: null,
  //       error: {
  //         type: "form",
  //         message: "Invalid form data",
  //       },
  //       formValues: {
  //         email: email?.toString(),
  //         password: password?.toString(),
  //       },
  //     },
  //   });
  // }

  let user = await getUserByEmail(result.email);
  if (!user) {
    flashError();
    return {
      status: 400,
      data: {
        user: null,
        error: {
          type: "email",
          message: "Invalid credentials",
        },
        formValues: {
          email: result.email,
          password: result.password,
        },
      },
    };
  }
  let ok = await comparePassword(result.password, user.password);
  if (!ok) {
    return {
      status: 400,
      data: {
        user: null,
        error: {
          type: "password",
          message: "Invalid credentials",
        },
        formValues: {
          email: result.email,
          password: result.password,
        },
      },
    };
  }

  return {
    status: 200,
    data: {
      user,
      error: null,
      formValues: {
        email: result.email,
        password: result.password,
      },
    },
  };
}

let LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
