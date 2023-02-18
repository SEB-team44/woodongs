import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfo } from "../../UserContext";
const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function ListDividers() {
  const { userInfo } = useContext(UserInfo);

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Link to="/EntireMain">
        <ListItem button>
          <ListItemText primary="전체 스터디" />
        </ListItem>
        <Divider />
      </Link>

      {userInfo.city ? (
        <Link to="/main">
          <ListItem button divider>
            <ListItemText primary="내 주변 스터디" />
          </ListItem>
          <Divider light />
        </Link>
      ) : (
        <Link>
          <ListItem button divider>
            <ListItemText primary="내 주변 스터디" sx={{color : "lightgray"}} />
          </ListItem>
          <Divider light />
        </Link>
      )}

      <Link to="/FreeBoard">
        <ListItem button>
          <ListItemText primary="전체 게시판" />
        </ListItem>
      </Link>
    </List>
  );
}
