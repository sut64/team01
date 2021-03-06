import { useEffect, useState } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  makeStyles,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import Select from "@material-ui/core/Select";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import { DormTenantInterface } from "../models/IDormTenant";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import { DormInventoryInterface } from "../models/IDormInventory";
import { RepairTypeInterface } from "../models/IRepairType";
import { DormInventoryTypeInterface } from "../models/IDormInventoryType";
import { RepairRequestinterface} from "../models/IRepairRequest";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
//import DormTenants from "./DormTenants";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NavbarRepairRequest from "./NavbarRepairRequest";
import { TextField } from "@material-ui/core";
const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    font:{fontFamily:"kanitlight",color:"black"},
    fontIn:{fontFamily:"kanitlight",fontSize:"14px"},
  })
);

function RepairRequestCreate() {
  const classes = useStyles();
  const [selectedDate1, setSelectedDate1] = React.useState<Date | null>(new Date());
  const [selectedDate2, setSelectedDate2] = React.useState<Date | null>(new Date());
  const [dormtenants, setDormTenants] = React.useState<DormTenantInterface>();
  const [inventorys, setInventorys] = React.useState<DormInventoryInterface[]>([]);
  const [inventorytypes, setInventorytypes] = React.useState<DormInventoryTypeInterface[]>([]);
  const [repairtypes, setRepairtypes] = React.useState<RepairTypeInterface[]>([]);
  const [roomallocate,setRoomAllocate] = React.useState<RoomAllocateInterface[]>([]);
  const [repairrequest, setRepairRequest] = React.useState<Partial<RepairRequestinterface>>(
    {}
  );

  //-------------------------set state --------

  const [success, setSuccess] = useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  
  //state ????????? EntryPermission
  const [state, setState] = useState({
     EntryPermissionF: false,
     EntryPermissionT: false,
  });


   //????????? token ????????? Localstorage
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };


    //---------------------------Handle ???????????? ??? ----------------------------------------

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };



  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    console.log(event.target.name)
    console.log(event.target.value)
    const name = event.target.name as keyof typeof repairrequest;
    setRepairRequest({
      ...repairrequest,
      [name]: event.target.value,
    });
  };

  const handleDateChange1 = (date: Date | null) => {
    console.log(date);
    setSelectedDate1(date);
  }; 
  const handleDateChange2 = (date: Date | null) => {
    console.log(date);
    setSelectedDate2(date);
  }; 

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name ;  
    console.log(name)
    console.log(event.target.checked)
    //setState({ ...state, [name]: event.target.checked });
    let EntryPermission = undefined

    if(name == "EntryPermissionT" && event.target.checked){
      setState({ ...state, ["EntryPermissionF"]: false, ["EntryPermissionT"]: true });
      EntryPermission = true
      
    }else if(name == "EntryPermissionT" && !(event.target.checked)){
      setState({ ...state, ["EntryPermissionT"]: false });
      EntryPermission = false
    }
///////////////////////// ??????????????????????????????????????????????????? ?????????????????????????????????????????????????????????????????? ????????? true 


    if (name == "EntryPermissionT" && !(event.target.checked)){
      setState({ ...state, ["EntryPermissionT"]: false, ["EntryPermissionF"]: false });
      EntryPermission = undefined
    }
////////////////////////////////
    if(name == "EntryPermissionF" && event.target.checked){
      setState({ ...state, ["EntryPermissionF"]: true ,["EntryPermissionT"]: false,});
      EntryPermission = false
    }else if(name == "EntryPermissionF" && !(event.target.checked)){
      setState({ ...state, ["EntryPermissionF"]: false });
      EntryPermission = undefined
    } else  if (name == "EntryPermissionF" && !(event.target.checked)){
      setState({ ...state, ["EntryPermissionT"]: false, ["EntryPermissionF"]: false });
      EntryPermission = undefined
    }


    setRepairRequest({
      ...repairrequest,
      ["EntryPermission"]: EntryPermission,
    });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RepairRequestCreate;
    const { value } = event.target;
    setRepairRequest({ ...repairrequest, [id]: value });
  };
 
  //---------------------------state----------------------------------------


  //-------------- ?????????????????? ??????????????????????????????
  
  const getDormTenants = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/route/GetDormTenant/${uid}`, requestOptions) 
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
         setDormTenants(res.data);
        } else {
          console.log("else");
        }
      });
  };

  //------------ ????????????????????????????????????????????????????????? 
  const getDormInventorytypes = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListDormInventoryType`, requestOptions) //???????????????????????????????????? api
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setInventorytypes(res.data);
        } else {
          console.log("else");
        }
      });
  };

   //------------- ???????????????????????????????????????

  const getDormInventory = async () => {
 
    fetch(`${apiUrl}/route/ListDormInventory`, requestOptions) 
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
            setInventorys(res.data);
        } else {
          console.log("else");
        }
      });
  };

     //------------- ?????????????????????????????????????????????????????????????????????

     const getRepairType = async () => {
       fetch(`${apiUrl}/route/ListRepairtype`, requestOptions) 
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                setRepairtypes(res.data);
            } else {
              console.log("else");
            }
          });
      };
    
    //-------------- ???????????????????????????????????????
    const getRoomAllocate = async () => {

        fetch(`${apiUrl}/route/ListRoomAllocates`, requestOptions) 
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
                setRoomAllocate(res.data);
            } else {
              console.log("else");
            }
          });
      };
  useEffect(() => {
    getDormTenants();
    getDormInventory();
    getDormInventorytypes();
    getRepairType();
    getRoomAllocate();

  }, []);

  const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      DormTenantID: convertType(dormtenants?.ID),
      RoomAllocateID: convertType(repairrequest.RoomAllocateID),
      DormInventoryID: convertType(repairrequest.DormInventoryID),
      //DormInventorytype: convertType(inventorytypes.ID),
      RepairTypeID: convertType(repairrequest.RepairTypeID),
      TelNumber: repairrequest.TelNumber ?? "",
      ProblemNote: repairrequest.ProblemNote ?? "",
      RecordDate: selectedDate1,
      RequestDate: selectedDate2,
      EntryPermission : repairrequest.EntryPermission,
    };

    console.log(data)
   const requestOptions = {
    method: "POST",
     headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",
   },
   body: JSON.stringify(data),
 };

  fetch(`${apiUrl}/route/CreateRepairRequest`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        console.log("???????????????????????????")
        setSuccess(true)
        setErrorMessage("")
      } else {
        console.log("????????????????????????????????????")
        setError(true)
        setErrorMessage(res.error)
      }
    });
  }



  return (
    <Container className={classes.container} maxWidth="md">
       <NavbarRepairRequest/>
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          ??????????????????????????????????????????????????????
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          ??????????????????????????????????????????????????????????????? : {errorMessage}
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} >
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              className={classes.font}
            >
              ???????????????????????????????????????????????????????????????
            </Typography>
          </Box>
        </Box>
        <Divider />


        <Grid container spacing={3} className={classes.root}>
         <Grid item xs={12} className={classes.font}>
           <p>?????????????????????????????????????????????</p>
           <FormControl fullWidth variant="outlined">
              <Select
                className={classes.fontIn}
                native
                disabled
                value={repairrequest.DormTenantID}
                /*onChange={handleChange}
                inputProps={{
                  name: "DormAttenID",
                }}*/
              >
                <option aria-label="None" value="">
                  {dormtenants?.DormTenant_FirstName} {dormtenants?.DormTenant_LastName}
                </option>
                {/*
                {dormattens.map((item: DormAttenInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName} {item.LastName}
                  </option>
                ))}*/}
              </Select>
            </FormControl>
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>???????????????????????????????????????????????????</p>
              <Select
                className={classes.fontIn}
                native
                value={repairrequest.RepairTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "RepairTypeID",
                }}
              >
                <option aria-label="None" value="">
                  ?????????????????????????????????????????????????????????????????????????????????
                </option>
                {repairtypes.map((item: RepairTypeInterface) => (
                  <option value={item.ID} key={item.ID}>
                   {item.TypeName}
                  </option>
                ))}
                
              </Select>
            </FormControl>
                </Grid>
      


                <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>???????????????????????????????????????????????????????????? ????????????????????????????????????</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  InputProps={{
                    classes: {
                      input: classes.fontIn,
                    },
                    
                  }}
                  disabled
                  name="RecordDate"
                  value={selectedDate1}
                  onChange={handleDateChange1}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>

        
   <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>???????????????????????????????????????</p>
              <Select
                className={classes.fontIn}
                native
                value={repairrequest.DormInventoryTypeID}
                onChange={handleChange}
                inputProps={{
                  name: "DormInventoryTypeID",
                }}
              >
                <option aria-label="None" value="">
                  ????????????????????????????????????????????????????????????????????? 
                </option>
                
                {inventorytypes.map((item: DormInventoryTypeInterface) => (
                  <option  key={item.ID} value={item.ID}>
                 {item.InvenType} 
                  </option>
                ))}
               </Select>
            </FormControl>
          </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
            <p>???????????????????????????????????????????????????</p>
              <Select
                className={classes.fontIn}
                native
                value={repairrequest.DormInventoryID}
                onChange={handleChange}
                inputProps={{
                  name: "DormInventoryID",
                }}
              >
                <option aria-label="None" value="">
                  ???????????????????????????????????????????????????
                </option>
                {inventorys.map((item: DormInventoryInterface) => (
                (repairrequest["DormInventoryTypeID"] == item.DormInventoryTypeID)?(<option value={item.ID} key={item.ID}>
                    {item.FurnitureName}
                  </option>):""
                ))}
                   </Select>
            </FormControl>
          </Grid>


        
                <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>??????????????????????????????????????????????????????</p>
              <Select
                native
                className={classes.fontIn}
                value={repairrequest.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomAllocateID",
                }}
              >
                <option aria-label="None" value="">
                  ??????????????????????????????????????????
                </option>
               
                {roomallocate.map((item: RoomAllocateInterface) => (
                  <option value={item.ID} key={item.ID}>
                     {item.Number}
                  </option> 
                ))}
              </Select>
            </FormControl>
          </Grid>

           
               
 

           
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>????????????????????????????????????????????????????????????????????? ???????????????????????? 3 ????????? ???????????? 7 ?????????</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  InputProps={{
                    classes: {
                      input: classes.fontIn,
                    },
                  }}
                  name="RequestDate"
                  value={selectedDate2}
                  onChange={handleDateChange2}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>?????????????????????????????????</p>
             <TextField
               InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
               placeholder="????????????????????????????????????????????? 10 ?????????????????????"
               id="TelNumber"
               variant="outlined"
               type="string"
               size="medium"
               value={repairrequest.TelNumber || ""}
               onChange={handleInputChange}
             />
           </FormControl>
           </Grid>

           <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>???????????????/???????????????</p>
             <TextField
               InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
               placeholder="??????????????????????????????????????????????????????????????????????????????????????????????????????????????????"
               id="ProblemNote"
               variant="outlined"
               type="string"
               size="medium"
               value={repairrequest.ProblemNote || ""}
               onChange={handleInputChange}
             />
           </FormControl>
           </Grid>

          <Grid item xs={3} className={classes.font}>
            <p>????????????????????????????????????????????????????????????</p>
          </Grid>
          <Grid item xs={4} >
          <FormControlLabel
            
              
              control={<Checkbox checked={state.EntryPermissionT} 
              id="EntryPermission"
              onChange={handleCheckboxChange}
              
              inputProps={{ 
              name : 'EntryPermissionT'}}
              
              name="EntryPermissionT" />}
              label="??????????????????"/> 

          <FormControlLabel
              
              
              control={<Checkbox checked={state.EntryPermissionF} 
              id="EntryPermission"
              onChange={handleCheckboxChange}
              
              inputProps={{ 
              name : 'EntryPermissionF'}}
              
              name="EntryPermissionF" />}
              label="???????????????????????????"/> 

          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/repairrequest"  
              variant="contained"
              className={classes.font}
            >
              ????????????
            </Button>
            <Button

              style={{ float: "right" ,backgroundColor:"#f4adfd"}}
              onClick={submit}
              variant="contained"
              color="default"
              className={classes.font}
            >
              ????????????????????????????????????
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default RepairRequestCreate;