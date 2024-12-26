import { Validator } from "@effijs/common";

@Validator.Decorators.Options({
  skipMissingProperties: true,
})
export class MovieFiltersFormValidator {
  @Validator.Decorators.Property()
  title?: string;

  @Validator.Decorators.Property()
  actor?: string;

  @Validator.Decorators.Property()
  order?: string;

  @Validator.Decorators.Property()
  sort?: string;

  @Validator.Decorators.Property()
  limit?: number;

  @Validator.Decorators.Property()
  offset?: number;
}
