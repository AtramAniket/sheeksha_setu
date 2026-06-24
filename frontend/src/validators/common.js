import { z } from "zod";

export const requiredString = (fieldName) =>
  z.string().trim().min(1, `${fieldName} is required`);

export const optionalString = () =>
  z.string().trim().optional().or(z.literal(""));

export const nameField = (fieldName = "Name") =>
  z
    .string()
    .trim()
    .min(2, `${fieldName} must be at least 2 characters`)
    .max(50, `${fieldName} must be less than 50 characters`)
    .regex(/^[A-Za-z\s.'-]+$/, `${fieldName} contains invalid characters`);

export const optionalNameField = (fieldName = "Name") =>
  z
    .string()
    .trim()
    .max(50, `${fieldName} must be less than 50 characters`)
    .regex(/^[A-Za-z\s.'-]*$/, `${fieldName} contains invalid characters`)
    .optional()
    .or(z.literal(""));

export const indianMobileField = (fieldName = "Mobile number") =>
  z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, `${fieldName} must be a valid 10 digit mobile number`);