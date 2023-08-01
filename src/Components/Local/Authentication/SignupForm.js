import Stack from "@mui/material/Stack";
import { FormControl, IconButton } from "@mui/material";
import { InputLabel } from "@mui/material";
import { FormHelperText } from "@mui/material";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Alert from "@mui/material/Alert";
 import AddPhotoIcon from "@mui/icons-material/AddAPhoto";
 import Fab from "@mui/material/Fab";
 import Snackbar from "@mui/material/Snackbar";
 import LoadingButton from "@mui/lab/LoadingButton";
import { API } from '../../../api';
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";

export const SignupForm = () => {
  const [show,setShow] = useState(false);
  const [conformShow, setConformShow] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [conformPassword,setConformPassword] = useState("");
  const [pic,setPic] = useState("");
  const [imageStatus,setImageStatus] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [errorMessage,setErrorMessage] = useState("");
  const [warning,setWarning] = useState(false);
  const [requiredWarning,setRequiredWarning] = useState(false);
  const [passwordWarning,setPasswordWarning] = useState(false);
  const [loginSuccess,setLoginSuccess] = useState(false);

  // console.log(password)
  const postDetails =(pic)=>{
    setLoading(true);
    if(pic=== undefined){
      setWarning(true);
      setImageStatus(null);
      return;
    }
    if(pic.type==="image/jpeg" || pic.type==="image/jpg" || pic.type==="image/png"){
      const data = new FormData();
      data.append("file",pic);
      data.append("upload_preset","we-chat");
      data.append("cloud_name", "ds7yvrq7h");
      fetch("https://api.cloudinary.com/v1_1/ds7yvrq7h/image/upload",{
        method:"POST",
        body:data
      }).then((res)=> res.json())
        .then((data)=>{
          setPic(data.url.toString());
          setImageStatus("Uploaded Successfully")
          setLoading(false);
        })
         .catch((err)=>{
          console.log(err);
          setLoading(false)
         })
    }else{
      setWarning(true);
      setImageStatus(null);
      setLoading(false);
      return;
    }
    
  };
  const handleSubmit = ()=>{
    setLoading(true);
    if(name==="" || email==="" || password==="" || conformPassword===""){
      setRequiredWarning(true);
      setLoading(false);
      return;
    } else if(password !== conformPassword){
      setPasswordWarning(true);
      setLoading(false);
      return;
    }
    const newUser = {
      name:name,
      email:email,
      password:password,
      pic:pic
    }

    fetch(`${API}/users/signup`,{
      method:'POST',
      body: JSON.stringify(newUser),
      headers:{"Content-type" : "application/json"}
    }).then((res)=>res.json())
      .then((res)=>{
        if(res.message){
        setLoginSuccess(true);
        setLoading(false);
        setTimeout(() => window.location.reload(), 400);
        }else if(res.error){
          setError(true);
          setErrorMessage(res.error);
          setLoading(false);
        }
      })
      .catch((err)=>{
        setError(true);
        setErrorMessage(err.message);
        setLoading(false);
      })
  };
  return (
    <>
      <Stack spacing={3}>
        <FormControl>
          {/* <InputLabel htmlFor="my-input" required>
          Name
        </InputLabel> */}
          <TextField
            label="Name"
            variant="outlined"
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <FormHelperText id="my-helper-text">
            Mandatory to fill this details*
          </FormHelperText>
        </FormControl>

        <FormControl>
          {/* <InputLabel htmlFor="my-input" required>
          Email
        </InputLabel> */}
          <TextField
            label="Email"
            variant="outlined"
            placeholder="Enter Email"
            type="email"
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

        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" required>
            Conform Password
          </InputLabel>
          <OutlinedInput
            // id="outlined-adornment-password"
            type={conformShow ? "text" : "password"}
            onChange={(e) => setConformPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setConformShow(!conformShow)}
                  onMouseDown={(event) => event.preventDefault()}
                  edge="end"
                >
                  {conformShow ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Conform Password*"
          />
          <FormHelperText id="my-helper-text">
            Mandatory to fill this details*
          </FormHelperText>
        </FormControl>

        <FormControl
        // sx={{
        //   display: "flex",
        //   flexDirection: "row",
        //   justifyContent: "space-between",
        // }}
        >
          <p style={{ fontWeight: "bold" }}>
            Upload your picture :{" "}
            {imageStatus ? <span style={{ color: "green", fontWeight: "bolder" }}>
              <DoneOutlineIcon fontSize="small"/> {imageStatus}
            </span> : ""}
          </p>
          <Fab
            color="secondary"
            aria-label="add-image"
            sx={{ overflow: "hidden" }}
          >
            <input
              type="file"
              onChange={(e) => postDetails(e.target.files[0])}
              // accept=".jpg, .jpeg, .png"
              accept="image/*"
              style={{
                //make this hidden and display only the icon
                position: "absolute",
                top: "-35px",
                left: 0,
                height: "calc(100% + 36px)",
                width: "calc(100% + 5px)",
                outline: "none",
                cursor: "pointer",
              }}
            />

            <AddPhotoIcon />
          </Fab>
          {/* <p></p> <p></p><p></p><p></p><p></p><p></p><p></p><p></p> */}
        </FormControl>

        <LoadingButton
          variant="contained"
          onClick={handleSubmit}
          loading={loading}
        >
          Sign Up
        </LoadingButton>
      </Stack>
      <Snackbar
        open={warning}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setWarning(false)}
      >
        <Alert
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setWarning(false)}
        >
          Please Select an Image
        </Alert>
      </Snackbar>

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
        open={passwordWarning}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setPasswordWarning(false)}
      >
        <Alert
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
          elevation={6}
          onClose={() => setPasswordWarning(false)}
        >
          Passwords Do Not Match
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
          Registered Successfully
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
