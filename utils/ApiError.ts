export class ApiError extends Error {
  constructor(public text: string) {
    super(text);
  }
}

export class FormatError extends ApiError {
  constructor(text: string, fields: Record<string, string>) {
    const message = `${text}... Fields: ${Object.entries(fields)
      .map(([key, value]) => `\n"${key}" - ${value}`)
      .join(", ")}`;
    super(message);
  }
}
