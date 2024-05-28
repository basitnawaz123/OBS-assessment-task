import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../services/userService";
import { useNavigate } from "react-router-dom";

const SignUpScreen = () => {
  let RequiredField = "Field cannot be empty";

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(RequiredField),
      lastName: Yup.string().required(RequiredField),
      email: Yup.string().required(RequiredField),
      password: Yup.string().required(RequiredField),
    }),
    onSubmit: async (values) => {
      await signUp(values).then((res) => {
        if (res.success) {
          formik.resetForm();
          navigate("/sign-in");
        }
      });
    },
  });
  return (
    <div>
      <form className="text-start" onSubmit={formik.handleSubmit}>
        <div className="mb-3 form-group">
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            onBlur={formik.handleBlur}
            required
            name="firstName"
            placeholder="First Name"
            className="form-control"
          />
          <p className="text-danger">
            {formik.touched.firstName && formik.errors.firstName}
          </p>
        </div>

        <div className="mb-3 form-group">
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            required
            name="lastName"
            placeholder="Last Name"
            className="form-control"
          />
          <p className="text-danger">
            {formik.touched.lastName && formik.errors.lastName}
          </p>
        </div>

        <div className="mb-3 form-group">
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            required
            name="email"
            placeholder="Email Address"
            className="form-control"
          />
          <p className="text-danger">
            {formik.touched.email && formik.errors.email}
          </p>
        </div>

        <div className="mb-3 form-group">
          <input
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            required
            name="password"
            placeholder="Password"
            className="form-control"
          />
          <p className="text-danger">
            {formik.touched.password && formik.errors.password}
          </p>
        </div>

        <div className="form-group">
          <button className="btn btn-primary w-100" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
