import { Validator } from "@effijs/common";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

@Validator.Decorators.Options({
  skipMissingProperties: true,
})
export class SignUpFormValidator {
  @Validator.Decorators.Property()
  @Validator.Decorators.Validator(
    (email) => emailRegex.test(email),
    "Invalid email",
  )
  email?: string;

  @Validator.Decorators.Property()
  @Validator.Decorators.IsDefined()
  name?: string;

  @Validator.Decorators.Property()
  @Validator.Decorators.Validator(
    (value) => value?.length >= 6,
    "Password must be at least 6 characters long",
  )
  password?: string;

  @Validator.Decorators.Property()
  @Validator.Decorators.Validator(
    (value, { password }) => password && password === value,
    "Passwords must match",
  )
  confirmPassword?: string;
}
