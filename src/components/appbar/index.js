import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { AppBar, IconButton, Toolbar } from "@material-ui/core";
import logo from '../../assets/images/Untitled.png';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    backgroundColor:'#D2B2CB',
    height: '100vh',
  },
  fullList: {
    width: "auto"
  },
  appbar: {
    flexGrow: 1,
    backgroundColor: 'rgba(155, 40, 123, 0.3)' ,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));
const titleStyle={
    color: '#9B287B',
    margin: '5px',
    marginLeft: '-30px',
    marginTop: '9px',
    fontSize: '30px',
    fontFamily: 'Pacifico, cursive',
}
const container={
    display: 'flex',
    flexGrow: 1,
    margin: '5px',
}
const logoStyle={
    display:'flex',
    marginLeft: '-45px'
}

export default function Appbar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div>
            <AppBar className={classes.appbar} position="static">
              <Toolbar>
                <IconButton
                  onClick={toggleDrawer(anchor, true)}
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuOpenIcon style={{fontSize: 28}} />
                </IconButton>
                <div style={container}>
                            <div style={logoStyle}>
                                <img src={logo} width="115px" height="60px" alt=""/>
                            </div>
                            <h2 style={titleStyle}>PoP<span style={{color:'#D2B2CB'}}>fliX</span></h2>
                        </div>
                <Button color="inherit">
                    <Link to='/logout' style={{color: '#9B287B', textDecoration: 'none', fontFamily: 'sans-serif', fontWeight: 'bold',fontSize:'14px'}}>
                        Logout
                    </Link>
                </Button>
              </Toolbar>
            </AppBar>
          </div>

          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
