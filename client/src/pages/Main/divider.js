import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";

const style = {
  width: "100%",
  bgcolor: "background.paper",
};

export default function ListDividers() {
  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <Link to="/EntireMain">
        <ListItem button>
          <ListItemText primary="전체 스터디" />
        </ListItem>
        <Divider />
      </Link>

      <Link to="/main">
        <ListItem button divider>
          <ListItemText primary="내 주변 스터디" />
        </ListItem>
        <Divider light />
      </Link>

      <Link to="/FreeBoard">
        <ListItem button>
          <ListItemText primary="전체 게시판" />
        </ListItem>
      </Link>
    </List>
  );
}
