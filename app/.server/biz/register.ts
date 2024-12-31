import {z} from "zod";
import {getUserByEmail, insertUser} from "../db/dao/users";
import {hashPassword} from "../utils/password";

let RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export async function register({
  email,
  password,
  confirmPassword,
}: {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  confirmPassword: FormDataEntryValue | null;
}) {
  let result = RegisterSchema.safeParse({email, password, confirmPassword});
  if (!result.success) {
    console.error(result.error.errors);
    return {
      status: 400,
      data: {
        error: {
          type: "form",
          message: "Invalid form data",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }

  if (result.data.password !== result.data.confirmPassword) {
    return {
      status: 400,
      data: {
        error: {
          type: "password",
          message: "Passwords do not match",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }

  if (await getUserByEmail(result.data.email)) {
    return {
      status: 400,
      data: {
        error: {
          type: "email",
          message: "Wrong credentials",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }
  let hashedPassword = await hashPassword(result.data.password);
  if (hashedPassword === null) {
    return {
      status: 500,
      data: {
        error: {
          type: "password",
          message: "Internal server error",
        },
        formValues: {
          email: email?.toString(),
          password: password?.toString(),
          confirmPassword: confirmPassword?.toString(),
        },
      },
    };
  }
  await insertUser(result.data.email, hashedPassword);

  return {
    status: 201,
    data: {
      error: null,
      formValues: {
        email: email?.toString(),
        password: password?.toString(),
        confirmPassword: confirmPassword?.toString(),
      },
    },
  };
}
