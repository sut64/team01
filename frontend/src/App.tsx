/*import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import DormAttens from "./components/DormAttens";
import DormAttenCreate from "./components/DormAttenCreate";
import PostalRecords from "./components/PostalRecords";
import PostalRecordCreate from "./components/PostalRecordCreate";
 
export default function App() {
 return (
   <Router>
     <div>
       <Navbar />
       <Routes>
         <Route path="/waiting1" element={<DormAttens />} />
         <Route path="/waiting2" element={<DormAttenCreate />} />
         <Route path="/create" element={<PostalRecordCreate />}/>
         <Route path="/" element={<PostalRecords />}/>
       </Routes>
     </div>
   </Router>
 );
}

//<link rel="preconnect" href="https://fonts.googleapis.com">
//<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
//<link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300&display=swap" rel="stylesheet"></link> 

// font-family: 'Kanit', sans-serif;*/

import React, { useEffect}  from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Home from "./components/Home";
import DormAttens from "./components/DormAttens";
import DormTenants from "./components/DormTenants";
import PostalRecords from "./components/PostalRecords";
import PostalRecordCreate from "./components/PostalRecordCreate";
import SignIn from "./components/SignIn";
import Navbar from "./components/Navbar";
import HomePostalRecord from "./components/HomePostalRecord";
import RoomAllocate from "./components/RoomAllocate";
import RoomAllocateCreate from "./components/RoomAllocateCreate";
import HomeRoomAllocate from "./components/HomeRoomAllocate";
import HomeFurnitureRequest from "./components/HomeFurnitureRequest";


import HomeCleaning from "./components/HomeCleaning";
import Cleaningrequrests from "./components/Cleaningrequrests";
import CleaningrequrestCreate from "./components/CleaningrequrestCreate";
import BillCreate from "./components/BillCreate";
import Bill from "./components/Bill";
import HomeBill from "./components/HomeBill";
import MeterRecord from "./components/MeterRecord";
import MeterRecordCreate from "./components/MeterRecordCreate";
import FurnitureRequest from "./components/FurnitureRequest";
import FurnitureRequestCreate from "./components/FurnitureRequestCreate";
import RepairRequestCreate from "./components/RepairRequestCreate";
import RepairRequest from "./components/RepairRequest";
import HomeRepair from "./components/HomeRepair";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    //nav : {background : "#239B56"},
    title: {
      flexGrow: 1,
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
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  })
);

export default function MiniDrawer() {
  
  const classes = useStyles();
 
  const [token, setToken] = React.useState<String>("");
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn />;
  }

 
  return (
    <div className={classes.root}>
      <Router>
      
        <CssBaseline />
        {token && (
          <>
        
          <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
           <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home_postal_record" element={<HomePostalRecord/>} />
              <Route  path="/dormtenant" element={<DormTenants/>} /> 
              <Route  path="/dormatten" element={<DormAttens/>} /> 
              
              <Route  path="/postal_record" element={<PostalRecords/>} />
              <Route  path="/postal_record/create" element={<PostalRecordCreate/>}/>
              <Route path="/home_roomallocate" element={<HomeRoomAllocate/>} />
              <Route  path="/roomallocate" element={<RoomAllocate/>}/>
              <Route  path="/roomallocate/create" element={<RoomAllocateCreate/>}/>
              <Route path="/homecleang" element={<HomeCleaning/>} />
              <Route  path="/cleaningrequrest" element={<Cleaningrequrests/>} />
              <Route  path="/cleaningrequrest/create" element={<CleaningrequrestCreate/>}/>
              <Route path="/home_bill" element={<HomeBill/>} />
              <Route  path="/bill" element={<Bill/>}/>
              <Route  path="/bill/create" element={<BillCreate/>}/>
              <Route  path="/meterrecord/create" element = {<MeterRecordCreate/>}/>
              <Route  path="/meterrecord" element = {<MeterRecord/>}/>
              <Route path="/home_furniturerequest" element={<HomeFurnitureRequest/>} />
              <Route  path="/furniturerequest" element={<FurnitureRequest/>} />
              <Route  path="/furniturerequest/create" element={<FurnitureRequestCreate/>}/>
              <Route path="/home_repairrequest" element={<HomeRepair/>} />
              <Route  path="/repairrequest" element={<RepairRequest/>}/>
              <Route  path="/repairrequest/create" element={<RepairRequestCreate/>}/>
            

              
              
              
           
           </Routes>
          </div>
          </main>
        </>
        )}

        
      </Router>
    </div>
  );
}
