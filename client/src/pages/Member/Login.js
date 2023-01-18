import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
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
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as Links } from "react-router-dom";
import { UserLogin } from "../../UserContext";
import { UserInfo } from "../../UserContext";
import styled from "styled-components";
import LogOut from "./Logout";

const StyledLogin = styled.div`
  .social_login .btn_btn_block_social_btn_kakao {
    justify-content: center;
    align-items: center;
    text-decoration-line: none;
  }
  .circularProgress {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.primary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Woodongs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// 카카오 인증 url
// woodongs.site:3000
// localhost:3000
// 3.35.188.110:8080
const KAKAOPATH =
  "https://api.woodongs.site/oauth2/authorization/kakao?redirect_uri=https://www.woodongs.site/Redirect";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    secondary: {
      main: "#fee501",
    },
    neutral: {
      main: "#64748B",
      contrastText: "#fff",
    },
  },
});

export default function Login() {
  let navigate = useNavigate();
  const { isLogin, setIslogin } = useContext(UserLogin);
  const { setUserInfo } = useContext(UserInfo);
  const [isLoading, setIsLoading] = useState(false);

  //처음 랜더링 되면 위도, 경도를 받아옴//
  useEffect(() => {
    const setgetLocation = () => {
      //위도 경도를 담을 변수
      let latitude = null;
      let longitude = null;

      setIsLoading(true);
      getLocation(latitude, longitude);
    };

    function getLocation(latitude, longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (pos) {
            latitude = pos.coords.latitude;
            longitude = pos.coords.longitude;

            if (typeof latitude === typeof 1 && typeof longitude === typeof 1) {
              alert("현재 위치는 : " + latitude + "," + longitude + "입니다");
              setLocation(latitude, longitude);
              setIsLoading(false);
            }
          },
          function (error) {
            alert(
              error, `현재 위치를 받아올 수 없습니다. 내 주변 스터디를 열람하려면 위치 엑세스를 허용 후, 새로고침 해주세요.`
            );
            if(latitude || longitude){
              localStorage.removeItem("latitude");
              localStorage.removeItem("longitude");
            }
            setIsLoading(false);
          }
        );
      } 
    }

    function setLocation(latitude, longitude) {
      if (latitude && longitude) {
        localStorage.setItem("latitude", `${latitude}`);
        localStorage.setItem("longitude", `${longitude}`);
      }
    }

    setgetLocation();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqOAuthPost = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    };

    fetch("https://api.woodongs.site/login", reqOAuthPost)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((response) => {
        localStorage.setItem("access_token", response.body.accessToken);
        localStorage.setItem("refresh_token", response.body.refreshToken);
        const a_token = localStorage.getItem("access_token");
        const r_token = localStorage.getItem("refresh_token");
        let tokens = [a_token, r_token];
        return tokens;
      })
      .then((tokens) => {
        if (!tokens[0] || !tokens[1]) {
          throw Error("로그인 실패 : 토큰이 존재하지 않습니다.");
        } else {
          if (tokens[0] !== null && tokens[1] !== null) {
            reqOAuthPost.headers["Authorization"] = tokens[0];
            reqOAuthPost.body = JSON.stringify({
              latitude: localStorage.getItem("latitude"),
              longitude: localStorage.getItem("longitude"),
            });
            fetch("https://api.woodongs.site/member/locate", reqOAuthPost)
              .then((res) => {
                fetch("https://api.woodongs.site/member/me", {
                  headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    credentials: "include",
                    Authorization: tokens[0],
                  },
                })
                  .then((res) => res.json())
                  .then((res) => {
                    setUserInfo({ ...res });
                  })
                  .then((res) => {
                    alert("로그인 성공");
                    setIslogin(true);
                    return navigate("/main");
                  })
                  .catch((error) => {
                    alert("로그인 실패");
                  });
              });
          }
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledLogin>
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
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>

            {isLogin ? (
              <div>
                <LogOut />
              </div>
            ) : (
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
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Links to="/SignUp">
                      {"Don't have an account? Sign Up"}
                    </Links>
                  </Grid>
                </Grid>
                {isLoading ? (
                  <div className="circularProgress">
                    <CircularProgress size={50} sx={{ mt: 5, mb: 1 }} />
                  </div>
                ) : (
                  <>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2, height: 48 }}
                    >
                      Login
                    </Button>
                    <div className="social_login">
                      <a
                        className="btn_btn_block_social_btn_kakao"
                        href={KAKAOPATH}
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          startIcon={
                            <Avatar
                              src={"https://it-mbti.com/img/kakao_icon.png"}
                            />
                          }
                        >
                          Login with Kakao
                        </Button>
                      </a>
                    </div>
                  </>
                )}
              </Box>
            )}
          </Box>

          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </StyledLogin>
    </ThemeProvider>
  );
}
