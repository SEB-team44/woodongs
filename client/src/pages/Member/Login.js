import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";

// import GoogleButton from "./GoogleButton";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import KakaoButton from "react-kakao-button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Links } from "react-router-dom";
import { UserLogin } from "../../UserContext";
import { Alert } from "antd";
//
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Woodongs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
//위도, 경도 받아오는거//
navigator.geolocation.getCurrentPosition(function (pos) {
  console.log(pos);
  let latitude = pos.coords.latitude;
  let longitude = pos.coords.longitude;
  alert("현재 위치는 : " + latitude + ", " + longitude);
});

// 카카오 인증 url
const KAKAOPATH =
  "http://59.16.126.210:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/Redirect";

const theme = createTheme();

export default function Login() {
  let navigate = useNavigate();
  const { setIslogin } = useContext(UserLogin);
  const [latitude, setlatitude] = useState(null);
  const [longitude, setlongitude] = useState(null);

  //위도, 경도 받아오는거//
  navigator.geolocation.getCurrentPosition(function (pos) {
    console.log(pos);
    let latitude = pos.coords.latitude;
    setlatitude(latitude);
    let longitude = pos.coords.longitude;
    setlongitude(longitude);
    alert("현재 위치는 : " + latitude + ", " + longitude);
  });


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqOAuthPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        withCredentials: true,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
        // phoneNumber: data.get("PhoneNumber"),
      }),
    };

    //59.16.126.210:8080대한님
    //14.6.86.98:8080 지훈님
    fetch("http://59.16.126.210:8080/login", reqOAuthPost)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        localStorage.setItem("access_token", response.body.accessToken);
        localStorage.setItem("refresh_token", response.body.refreshToken);
        const a_token = localStorage.getItem("access_token");
        const b_token = localStorage.getItem("refresh_token");
        let tokens = [a_token, b_token];
        return tokens;
      })
      .then((tokens) => {
        if (!tokens[0] || !tokens[1]) {
          throw Error("could not fetch the data for that resource");
        } else {
          if (tokens[0] !== null && tokens[1] !== null) {
            navigate("/main");
            setIslogin(true);
          }
        }
      })
      .then((res) => {
        alert("토큰을 가져왔습니다");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => handleSubmit(e)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* <Links to="/main"> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {/* </Links> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="http://localhost:3000/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <div className="social_login">
              <FacebookLoginButton onClick={() => alert("Hello")} />

              {/* <GoogleButton/> */}
              {/* onClick={() => handleKakao()} */}
              <a className="btn btn-block social-btn google" href={KAKAOPATH}>
              <KakaoButton  />
              </a>
              <Links to="/main">
                {" "}
                <button
                  onClick={() => {
                    setIslogin(true);
                  }}
                >
                  임시로그인버튼
                </button>
              </Links>
              <Links to="/main">
                {" "}
                <button
                  onClick={() => {
                    localStorage.clear();
                  }}
                >
                  {" "}
                  로그인 안하고 메인가기
                </button>
              </Links>
            </div>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
