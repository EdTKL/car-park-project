import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { setUserRole } from "./authSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.auth.role);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Assuming the registration was successful and the user is now an admin
    dispatch(setUserRole("admin"));
    navigate("/"); // Redirect back to home or any other page
  };

  if (userRole !== "admin") {
    return <div>You do not have permission to access this page.</div>;
  }

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
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
