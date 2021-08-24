import {
  Avatar,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
} from "@material-ui/core";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { connect, useDispatch } from "react-redux";
import { loginUser } from "../../apis/loginUser";
import {
  setFacebookLogin,
  setGoogleLogin,
  setUserData,
} from "../../actions/setUserData";
import { GoogleLogin } from "react-google-login";
import { GoogleOutlined } from "@ant-design/icons";
import { FacebookFilled } from "@ant-design/icons";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import logo from "../../assets/images/Untitled.png";
import LockIcon from "@material-ui/icons/Lock";
import image from "../../assets/images/bg1.jpg";
import axios from "axios";

const paperStyle = {
  padding: 15,
  height: "auto",
  width: 300,
  margin: "15px auto",
  marginTop: "20px",
  borderRadius: "25px",
  backgroundColor: "rgba(230, 219, 228,0.9)",
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
  fontWeight: "bold",
  letterSpacing: "2px",
};
const headerStyle = {
  color: "#5C164E",
  fontSize: "30px",
  fontStyle: "normal",
  fontWeight: "900",
  fontFamily: "Roboto",
};
const orStyle = {
  textAlign: "center",
  borderBottom: "1px double grey",
  padding: "3px",
};
const googleButton = {
  color: "white",
  width: "100%",
  margin: "8px auto",
  padding: "10px 20px",
  cursor: "pointer",
  backgroundColor: "#DB4437",
  border: "none",
  borderRadius: "6px",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "16px",
};
const facebookbutton = {
  color: "white",
  width: "100%",
  margin: "8px auto",
  padding: "10px 20px",
  cursor: "pointer",
  backgroundColor: "#3b5998",
  border: "none",
  borderRadius: "6px",
  fontFamily: "sans-serif",
  fontWeight: "bold",
  fontSize: "16px",
};
const googleLogo = {
  margin: "3px",
};
const facebooklogo = {
  margin: "3px",
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
  letterSpacing: "3px",
  justifyContent: "center",
  fontFamily: "Style Script, cursive",
  fontWeight: "bold",
  borderRadius: "10px",
};
const popflix = {
  fontFamily: "Pacifico, cursive",
  fontWeight: "bold",
  color: "#5C164E",
  fontSize: "15px",
  letterSpacing: "1px",
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
  top: 0,
  left: 0,
};
const root = {
  backgroundImage: `url(${image})`,
  minHeight: "106vh",
  backgroundSize: "cover",
};

const Login = (props) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const history = useHistory();

  const responseGoogle = (res) => {
    console.log("divij ---", res);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/googlelogin",
      data: {
        tokenId: res.tokenId,
        name: res.profileObj.name,
        email: res.profileObj.email,
      },
    }).then((response) => {
      console.log("divij---- response", response.data);
      setGoogleLogin(dispatch, response);
      console.log("dispatch", response);
      sessionStorage.setItem("user_data", JSON.stringify(response.data));
      sessionStorage.setItem("username", response.data.username);
      addToast("Google Login Success!", {
        appearance: "success",
        autoDismiss: true,
      });
      history.replace("/dashboard");
    });
  };
  const responseFacebook = (res) => {
    console.log(res);
    axios({
      method: "POST",
      url: "http://localhost:5000/api/auth/facebooklogin",
      data: { accessToken: res.accessToken, userID: res.userID },
    }).then((res) => {
      console.log(res.data.username);
      setFacebookLogin(dispatch, res);
      sessionStorage.setItem("user_data", JSON.stringify(res.data));
      sessionStorage.setItem("username", res.data.username);
      addToast("Facebook Login Success!", {
        appearance: "success",
        autoDismiss: true,
      });
      history.replace("/dashboard");
    });
  };
  const handleInputChange = (e) => {
    const target = e.target;
    const name = target.name;
    if (name === "username") {
      setUsername(target.value);
    }
    if (name === "password") {
      setPassword(target.value);
    }
  };

  const submitData = async () => {
    try {
      const data = await loginUser(username, password);
      console.log("login success", data.data);
      setUserData(dispatch, data);
      if (data.status === 200) {
        if (data.data.roles === "user") {
          console.log(data.data.roles);
          history.replace("/dashboard");
        } else if (data.data.roles === "admin") {
          history.replace("/admin-dashboard");
        }
        addToast("Login Successfull!", {
          appearance: "success",
          autoDismiss: true,
        });
        // setUserData(dispatch, data);
        sessionStorage.setItem("user_info", true);
      }
    } catch (e) {
      console.log("User Not Found", e);
      addToast("User not found", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <React.Fragment>
      <div style={root}>
        <div style={{ backgroundColor: "rgba(23, 15, 17, 0.4)" }}>
          <Grid item xs={12} sm={12}>
            <div style={container}>
              <div style={logoStyle}>
                <img src={logo} width="120px" height="60px" alt="" />
              </div>
              <h2 style={titleStyle} width="180px" height="80px">
                PoP<span style={{ color: "#B76DA3" }}>FliX</span>
              </h2>
            </div>
            <Container maxWidth="xs">
              <Paper elevation={10} style={paperStyle}>
                <Container align="center">
                  <Avatar style={avatarStyle}>
                    <LockIcon />
                  </Avatar>
                  <h2 style={headerStyle}>SIGN IN</h2>
                </Container>
                <form onSubmit={handleSubmit(submitData)}>
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
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={handleInputChange}
                        name="rememberMe"
                        color="primary"
                      />
                    }
                    label="Remember Me"
                  />
                  <Button
                    style={buttonStyle}
                    type="submit"
                    variant="contained"
                    startIcon={<LockOpenIcon />}
                    fullWidth>
                    Login
                  </Button>

                  <Typography variant="overline">
                    New to <span style={popflix}>PoPfliX? </span>
                    <Link to="/register">Sign Up</Link>
                  </Typography>
                </form>

                <div style={orStyle}>OR</div>
                <div>
                  <GoogleLogin
                    clientId="382026133381-fk52usmsprkhk68l1kri82riamkgfpp4.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <button
                        style={googleButton}
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}>
                        <span style={googleLogo}>
                          <GoogleOutlined />
                        </span>{" "}
                        Google Login
                      </button>
                    )}
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>
                <div>
                  <FacebookLogin
                    appId="197658568971396"
                    callback={responseFacebook}
                    fields="name,email"
                    render={(renderProps) => (
                      <button
                        style={facebookbutton}
                        onClick={renderProps.onClick}>
                        <span style={facebooklogo}>
                          <FacebookFilled />
                        </span>{" "}
                        Facebook Login
                      </button>
                    )}
                  />
                </div>
              </Paper>
            </Container>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

const MapStatetoProps = (state) => ({
  data: state.data,
  login: state.login,
  loading: state.loading,
});
const MapDispatchtoProps = {
  loginUser: loginUser,
};
export default connect(MapStatetoProps, MapDispatchtoProps)(Login);
