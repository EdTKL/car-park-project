import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { registerThunk } from "../../redux/slice/authSlice";
// import { setUserRole } from "./authSlice";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");


  const dispatch = useAppDispatch();
  // const userRole = useAppSelector((state) => state.auth.role);
  const [role, setRole] = useState("staff");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password!==confirm_password){
      throw new Error("password and confirm password doesn't match")
    }
    dispatch(registerThunk({ username, password, confirm_password,role }))
      .unwrap()
      .then(() => {


        navigate("/home")
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // if (userRole !== "admin") {
  //   return <div>You do not have permission to access this page.</div>;
  // }

  return (
    <form onSubmit={submitHandler}>
      <h3>Register</h3>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          type="confirm_password"
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></input>
        <label htmlFor="role">Role</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="staff">Staff</option>
        </select>
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
