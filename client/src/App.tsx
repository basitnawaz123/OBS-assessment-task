import "./App.css";
import SignInScreen from "./screens/SignIn";
import SignUpScreen from "./screens/SignUp";
import Users from "./screens/Users";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/users" element={<Users />} />
      <Route path="/sign-up" element={<SignUpScreen />} />
      <Route path="/" element={<SignInScreen />} />
    </Routes>
  );
}

export default App;
