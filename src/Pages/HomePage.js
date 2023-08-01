import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { CustomTabPanel } from "../Components/MUI Files/CustomTabPanel";
import { LoginForm } from "../Components/Local/Authentication/LoginForm";
import { SignupForm } from "../Components/Local/Authentication/SignupForm";
import { useNavigate} from "react-router-dom";


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const HomePage = () => {
  const navigate = useNavigate();

  const userDataInLocalStorage = () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats")
  };

  useEffect(() => userDataInLocalStorage(), []);


  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            p: "8px",
            bgcolor: "white",
            w: "100%",
            m: "40px 0 15px 0",
            borderRadius: "lg",
            borderWidth: "1px",
          }}
        >
          <h1 className="app-name">We Chat</h1>
        </Box>
        <Box sx={{ width: "100%", bgcolor: "white" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab sx={{ width: "50%" }} label="Login" {...a11yProps(0)} />
              <Tab sx={{ width: "50%" }} label="Sign Up" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <LoginForm />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <SignupForm />
          </CustomTabPanel>
        </Box>
      </Container>
    </>
  );
};
