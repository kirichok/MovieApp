import { Validator } from "@effijs/common";

@Validator.Decorators.Options({
  skipMissingProperties: true,
})
export class SignInFormValidator {
  @Validator.Decorators.Property()
  @Validator.Decorators.IsDefined()
  // @Validator.Decorators.IsDefined("Email is required")
  email?: string;

  @Validator.Decorators.Property()
  // @Validator.Decorators.IsDefined()
  @Validator.Decorators.Validator(
    (value) => value?.length >= 6,
    "Password must be at least 6 characters long",
  )
  // @Validator.Decorators.IsDefined("Password is required")
  password?: string;
}
