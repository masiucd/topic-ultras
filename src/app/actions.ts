"use server";
import "server-only";
import {formatErrors, formatZodErrors} from "@/lib/helpers";
import {z} from "zod";

let registerSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

type ErrosObj = Map<
  string,
  {
    message: string;
  }
>;

type RegisterSchema = z.infer<typeof registerSchema>;
type PrevState = {
  values: RegisterSchema;
  // error: ReturnType<typeof formatZodErrors> | null;
  error: ErrosObj | null;
};

let RegisterInputNames = Object.freeze({
  username: "username",
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
});

export async function register(
  _prevState: PrevState | null,
  data: FormData
): Promise<PrevState> {
  let formValues = Object.fromEntries(data);
  let validatedData = registerSchema.safeParse(formValues);
  if (!validatedData.success) {
    return {
      values: {
        [RegisterInputNames.username]: (formValues.username as string) ?? "",
        [RegisterInputNames.email]: (formValues.email as string) ?? "",
        [RegisterInputNames.password]: (formValues.password as string) ?? "",
        [RegisterInputNames.confirmPassword]:
          (formValues.confirmPassword as string) ?? "",
      },
      error: formatZodErrors(validatedData.error.errors),
    };
  }
  let {username, email, password, confirmPassword} = validatedData.data;

  if (password !== confirmPassword) {
    return {
      values: {
        username: (formValues.username as string) ?? "",
        email: (formValues.email as string) ?? "",
        password: (formValues.password as string) ?? "",
        confirmPassword: (formValues.confirmPassword as string) ?? "",
      },
      error: formatErrors([
        {
          message: "Password does not match",
          name: RegisterInputNames.password,
        },
        {
          message: "Password does not match",
          name: RegisterInputNames.confirmPassword,
        },
      ]),
    };
  }

  return {
    values: {username, email, password, confirmPassword},
    error: null,
  };
}
