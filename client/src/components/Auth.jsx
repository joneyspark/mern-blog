import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const sendRequest = async (type = "signin") => {
    const res = axios
      .post(`${baseURL}/users/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => {
        setError(err.response.data);
      });

    const data = await res;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      sendRequest("signup").then((data) => {
        if (data.status === 200) {
          localStorage.setItem("user", data.data.user._id);
          dispatch(authActions.login());
          navigate("/blogs");
          setError("");
        }
      });
    } else {
      sendRequest().then((data) => {
        if (data.status === 200) {
          localStorage.setItem("user", data.data.user._id);
          dispatch(authActions.login());
          navigate("/blogs");
          setError("");
        }
      });
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h4" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal"
              name="name"
            />
          )}
          <TextField
            onChange={handleChange}
            value={inputs.email}
            type={"email"}
            placeholder="Email"
            margin="normal"
            name="email"
          />
          <TextField
            onChange={handleChange}
            value={inputs.password}
            type={"password"}
            placeholder="Password"
            margin="normal"
            name="password"
          />
          <Typography variant="h6" color="error">
            {error}
          </Typography>
          <Button
            variant="contained"
            color="warning"
            sx={{ borderRadius: 3, marginTop: 3 }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change to {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
