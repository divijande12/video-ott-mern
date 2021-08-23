import { Avatar, Button, Grid, Paper, TextField } from "@material-ui/core";
import React, { useState } from "react";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { registerUser } from "../../apis/registerUser";
import logo from "../../assets/images/Untitled.png";
import image from "../../assets/images/bg1.jpg";

const paperStyle = {
  padding: 15,
  height: "auto",
  width: 300,
  margin: "15px auto",
  borderRadius: "25px",
  backgroundColor: "rgba(230, 219, 228,0.9)",
  marginTop: "30px",
};
const avatarStyle = {
  backgroundColor: "#5C164E",
};
const buttonStyle = {
  marginTop: "15px",
  marginBottom: "15px",
  backgroundColor: "#5C164E",
  color: "white",
  fontFamily: "sans-serif",
};
const signinStyle = {
  marginLeft: "20px",
};
const logoStyle = {
  display: "flex",
  marginTop: "3px",
};
const container = {
  display: "flex",
  margin: "0px",
  height: "10vh",
  width: "100%",
  background: "rgba(64, 32, 57, 0.8)",
};
const titleStyle = {
  color: "#9B287B",
  margin: "5px",
  marginLeft: "-30px",
  marginTop: "5px",
  padding: "2px",
  fontSize: "37px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  fontFamily: "Style Script, cursive",
  letterSpacing: "3px",
  fontWeight: "bold",
  borderRadius: "10px",
};
const root = {
  backgroundImage: `url(${image})`,
  height: "115vh",
  backgroundSize: "cover",
  marginTop: "-5px",
  boxSizing: "border-box",
};
export default function Register() {
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const roles = ["user", "user"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addToast } = useToasts();

  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    console.log(target.value);
    if (name === "firstname") {
      setFirstname(target.value);
    }
    if (name === "lastname") {
      setLastname(target.value);
    }
    if (name === "username") {
      setUsername(target.value);
    }
    if (name === "email") {
      setEmail(target.value);
    }
    if (name === "password") {
      setPassword(target.value);
    }
  };

  const submitData = async () => {
    console.log(firstname, lastname, username, email, password, roles);
    try {
      const data = await registerUser(
        firstname,
        lastname,
        username,
        email,
        password,
        roles
      );
      console.log(data);
      if (data.status === 200) {
        addToast("Saved Successfully", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (e) {
      console.log(e);
      addToast("Something went wrong!", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div style={root}>
      <div style={{ backgroundColor: "rgba(23, 15, 17, 0.4)" }}>
        <Grid>
          <div style={container}>
            <div style={logoStyle}>
              <img src={logo} width="120px" height="60px" alt="" />
            </div>
            <h2 style={titleStyle}>
              PoP<span style={{ color: "#B76DA3" }}>FliX</span>
            </h2>
          </div>
          <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <PlayCircleFilledIcon />
              </Avatar>
              <h2
                style={{
                  color: "#51344D",
                  fontSize: "30px",
                  fontWeight: "900",
                  fontFamily: "Roboto",
                }}>
                Register Here
              </h2>
            </Grid>
            <form onSubmit={handleSubmit(submitData)}>
              <div>
                <TextField
                  style={{ margin: "5px auto" }}
                  id="standard-basic"
                  label="Firstname"
                  placeholder="Enter Firstname"
                  {...register("firstname", {
                    required: "Firstname is required",
                  })}
                  error={Boolean(errors.firstname)}
                  helperText={errors.firstname?.message}
                  onChangeCapture={handleInputChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px auto" }}
                  id="standard-basic"
                  label="Lastname"
                  placeholder="Enter Lastname"
                  {...register("lastname", {
                    required: "Lastname is required",
                  })}
                  error={Boolean(errors.lastname)}
                  helperText={errors.lastname?.message}
                  onChangeCapture={handleInputChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px auto" }}
                  id="standard-basic"
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  onChangeCapture={handleInputChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px auto" }}
                  id="standard-basic"
                  label="Username"
                  placeholder="Enter Username"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  error={Boolean(errors.username)}
                  helperText={errors.username?.message}
                  onChangeCapture={handleInputChange}
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  style={{ margin: "5px auto" }}
                  id="standard-basic"
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  onChangeCapture={handleInputChange}
                  fullWidth
                />
              </div>

              <Button
                style={buttonStyle}
                type="submit"
                variant="contained"
                startIcon={<LockOpenIcon />}
                fullWidth>
                Register
              </Button>

              <Typography style={signinStyle} variant="overline">
                Already have an account?
                <Link to="/">Sign In</Link>
              </Typography>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  );
}
