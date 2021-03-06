import React,{useState,useEffect} from "react";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { Button,Drawer } from "@material-ui/core";

import clsx from "clsx"; 
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MedicationIcon from '@mui/icons-material/Medication';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ChairIcon from '@mui/icons-material/Chair';
import ChairAltIcon from '@mui/icons-material/ChairAlt';

import Divider from "@material-ui/core/Divider";
import { List } from "@material-ui/core";
import { DormAttenInterface } from "../models/IDormAtten";
import { fontSize } from "@mui/system";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>

  createStyles({
    font:{fontFamily:"kanitlight"},
    fontName:{fontFamily:"kanitlight",color:"black"},
    root: {
      display: "flex",
    },
    nav : {background : "#f4adfd"},
    title: {
      flexGrow: 1,
      fontFamily:"kanitlight",color:"black",
      fontSize:"10px",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    menubar: {
      textDecoration: "none",
      color: "inherit",
      /*fontFamily:"kanitlight"*/
    },
  })
);


function NavbarFurnitureRequest() {
  
  
 const classes = useStyles();
 const [open, setOpen] = React.useState(false);
 const apiUrl = "http://localhost:8080";
 const requestOptions = {
   method: "GET",
   headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",
   },
 };
  //const [token, setToken] = React.useState<String>("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    { name: "?????????????????????", icon: <HomeIcon />, path: "/" },
    /*{ name: "???????????????????????????????????????????????????????????????", icon: <MarkAsUnreadIcon />, path: "/home_postal_record" },
    { name: "????????????????????????????????????", icon: <AccountCircleIcon />, path: "/dormatten" },
    { name: "???????????????????????????????????????????????????", icon: <LocalPostOfficeIcon />, path: "/postal_record" },
    { name: "??????????????????????????????????????????????????????????????????", icon: <NoteAltIcon />, path: "/postal_record/create" },
    { name: "????????????????????????????????????????????????????????????", icon: <RoomPreferencesIcon />, path: "/home_roomallocate" },
    { name: "????????????????????????????????????????????????????????????", icon: <BedroomChildIcon />, path: "/roomallocate" },
    { name: "?????????????????????????????????????????????????????????????????????????????????", icon: <NoteAltIcon />, path: "/roomallocate/create" },
    { name: "?????????????????????????????????????????????????????????", icon: <HomeIcon />, path: "/homecleang" },
    { name: "?????????????????????????????????????????????", icon: <CleaningServicesIcon />, path: "/cleaningrequrest" },
    { name: "?????????????????????????????????????????????????????????????????????", icon: <CleaningServicesIcon />, path: "/cleaningrequrest/create" },*/
    { name: "?????????????????????????????????????????????", icon: < ChairAltIcon />, path: "/home_furniturerequest" },
    { name: "????????????????????????????????????????????????????????????", icon: <ChairIcon />, path: "/furniturerequest" },
    { name: "???????????????????????????????????????????????????????????????????????????", icon: <ChairIcon />, path: "/furniturerequest/create" },
  ]

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  const theme = useTheme();
  
  const [dormatten, setDormAttens] = useState<DormAttenInterface>();
 
  const getDormAttens = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/route/GetDormAtten/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDormAttens(res.data);
        } else {
          console.log("else");
        }
      });
  };
  
    useEffect(() => {
      getDormAttens();
  }, []);


 return (
  
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar,classes.nav, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <img src="/img/logo_dorm_system.jpg" width="50px"></img>
            {/*<MenuIcon />*/}
          </IconButton>
         {/* <img src="/img/postal.png" width="50px"></img>*/}
          <Typography variant="h6" className={classes.title}>
          <h1>?????????????????????????????????????????????</h1>
          </Typography>
          <Typography variant="subtitle1" className={classes.fontName}>
            {dormatten?.FirstName} &nbsp;&nbsp;       
          </Typography>
          <Button color="inherit" 
          style={{fontFamily:"kanitlight",color:"black"}}
          //style={{backgroundColor:"#E5E7E9"}}
          onClick={signout}>
            ??????????????????????????????
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menu.map((item, index) => (
            <Link to={item.path} key={item.name} className={classes.menubar}>
              <ListItem button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText  disableTypography style={{fontFamily:"kanitlight"}} primary={item.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </>
  )

          }

export default NavbarFurnitureRequest;
