import { ObjectSchema } from 'joi';

export function validateInput(
  schema: ObjectSchema,
  fields: { [key: string]: any }
): { [key: string]: any } | { error: string } {
  const validationResult = schema.validate(fields);
  if (validationResult.error) {
    return {
      error: validationResult.error.details[0].message,
    };
  }
  return fields;
}
