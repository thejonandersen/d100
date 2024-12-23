import { z } from "zod";

export class ServiceResponse<T = null> {
  readonly message: string;
  readonly responseObject: T;

  private constructor( message: string, responseObject: T) {
    this.message = message;
    this.responseObject = responseObject;
  }

  static success<T>(message: string, responseObject: T) {
    return new ServiceResponse(message, responseObject);
  }

  static failure<T>(message: string, responseObject: T) {
    return new ServiceResponse(message, responseObject);
  }
}

export const ServiceResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    message: z.string(),
    responseObject: dataSchema.optional(),
  });
