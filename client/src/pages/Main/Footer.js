import React from "react";
import styled from "styled-components";
import { Typography } from "@mui/material";

const StyledFooter = styled.div`

`;

const Footer = () => {
  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props} 
        //
      >
        {"Copyright © "}

          Woodongs Team 44 All right reserved 

        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
  return (
    <>
      <StyledFooter>
        <footer>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        </footer>
      </StyledFooter>
    </>
  );
};

export default Footer;