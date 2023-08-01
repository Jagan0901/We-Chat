import Stack from "@mui/material/Stack";
import { FormControl, IconButton} from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";
import { API } from "../../../api";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../../Context/ChatProvider";

export const LoginForm = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [requiredWarning,setRequiredWarning] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState(null);
  const [loginSuccess,setLoginSuccess] = useState(false);
  const {setUser} = ChatState();

  const navigate = useNavigate();

  const handleSubmit = ()=>{
    setLoading(true);
    if(email==="" || password===""){
      setRequiredWarning(true);
      setLoading(false);
      return;
    }
    const user = {
      email:email,
      password:password
    };
    fetch(`${API}/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setLoginSuccess(true);
          setUser(res);
          localStorage.setItem("userInfo", JSON.stringify(res));
          setLoading(false);
          setTimeout(() => navigate("/chats"), 1500); 
        } else if (res.error) {
          setError(true);
          setErrorMessage(res.error);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
        setLoading(false);
      });
  };

  const handleCredentials = ()=>{
    setEmail("guest@mail.com");
    setPassword("Password@123");
  }
  return (
    <>
      <Stack spacing={3}>
        <FormControl>
          <TextField
            label="Email"
            variant="outlined"
            placeholder="Enter Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormHelperText id="my-helper-text">
            Mandatory to fill this details*
          </FormHelperText>
        </FormControl>

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>
            Password
          </InputLabel>
          <OutlinedInput
            // id="outlined-adornment-password"
            type={show ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShow(!show)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password*"
          />
          <FormHelperText id="my-helper-text">
            Mandatory to fill this details*
          </FormHelperText>
        </FormControl>

        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
        >
          Login
        </LoadingButton>
        <LoadingButton
          variant="contained"
          color="secondary"
          onClick={handleCredentials}
          // loading={loading}
        >
         Get User Credentials
        </LoadingButton>
      </Stack>

      <Snackbar
        open={requiredWarning}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setRequiredWarning(false)}
      >
        <Alert
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setRequiredWarning(false)}
        >
          Please fill out the Mandatory Fields
        </Alert>
      </Snackbar>

      <Snackbar
        open={loginSuccess}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setLoginSuccess(false)}
      >
        <Alert
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setLoginSuccess(false)}
        >
          Login Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setError(false)}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setError(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
