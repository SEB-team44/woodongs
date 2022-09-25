import React from "react";
import Button from "@mui/material/Button";
const LogOut = () => {
  return (
    <Button
      onClick={() => handleLogout()}
      className="submit-button"
      variant="contained"
    >
      LogOut
    </Button>
  );
};

export default LogOut;
