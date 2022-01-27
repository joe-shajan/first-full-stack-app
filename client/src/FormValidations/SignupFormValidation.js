import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("Firstname is required")
      .min(2, "Firstname must be at least 2 characters")
      .max(20, "Firstname must not exceed 20 characters"),
    lastName: Yup.string()
      .required("Lastname is required")
      .min(2, "Lastname must be at least 2 characters")
      .max(20, "Lastname must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  export default validationSchema;