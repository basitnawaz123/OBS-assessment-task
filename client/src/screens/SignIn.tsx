import { useFormik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/userService";

const SignInScreen = () => {
  let RequiredField = "Field cannot be empty";

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(RequiredField),
      password: Yup.string().required(RequiredField),
    }),
    onSubmit: async (values) => {
      await signIn(values)
        .then((res) => {
          console.log(res);

          if (res.success) {
            formik.resetForm();
            localStorage.setItem("access_token", res.data.token);
            navigate("/users");
          }
        })
        .catch((err) => {
          formik.setFieldError("password", err.response.data.message);
        });
    },
  });

  return (
    <div>
      <h2>Sign In</h2>
      <form className="text-start" onSubmit={formik.handleSubmit}>
        <div className="mb-3 form-group">
          <input
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
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
            onBlur={formik.handleBlur}
            value={formik.values.password}
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
          <button className="btn btn-primary w-50" type="submit">
            Sign In
          </button>
        </div>
        <div className="form-group mt-3">
          <NavLink className="btn btn-link" to="/sign-up">
            Create Account
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignInScreen;
