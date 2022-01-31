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
   
  });

  export default validationSchema;