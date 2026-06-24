import { z } from "zod";
import {
  indianMobileField,
  nameField,
  optionalNameField,
  optionalString,
  requiredString,
} from "./common";

export const studentCreateSchema = z.object({
  admission_no: requiredString("Admission number").max(
    30,
    "Admission number must be less than 30 characters"
  ),

  first_name: nameField("First name"),
  middle_name: optionalNameField("Middle name"),
  last_name: optionalNameField("Last name"),

  gender: requiredString("Gender"),
  date_of_birth: requiredString("Date of birth"),

  class_name: requiredString("Class"),
  section: optionalString(),

  guardian_name: nameField("Guardian name"),
  guardian_phone: indianMobileField("Guardian phone"),

  address: optionalString(),
});