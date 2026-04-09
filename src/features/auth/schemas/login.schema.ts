import * as yup from "yup";

export const loginSchema = yup.object({
  identifier: yup.string().trim().required("Email or User ID is required."),
  password: yup.string().trim().required("Password is required."),
});
