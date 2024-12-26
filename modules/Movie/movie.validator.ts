import { Validator } from "@effijs/common";

@Validator.Decorators.Options({
  skipMissingProperties: true,
})
export class MovieFormValidator {
  @Validator.Decorators.Property()
  @Validator.Decorators.IsDefined()
  title?: string;

  @Validator.Decorators.Property()
  @Validator.Decorators.Validator(
    (value) => value && value <= new Date().getFullYear(),
    "Must be a valid year",
  )
  year?: number;

  @Validator.Decorators.Property()
  @Validator.Decorators.IsDefined()
  format?: string;

  @Validator.Decorators.Property()
  @Validator.Decorators.Validator(
    (value) => value?.length > 0,
    "Should have at least one actor",
  )
  @Validator.Decorators.Type(() => Actor)
  actors?: Actor[];
}

class Actor {
  @Validator.Decorators.Property()
  @Validator.Decorators.IsDefined()
  name?: string;
}
