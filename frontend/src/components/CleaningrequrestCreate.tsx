import { useEffect, useState } from "react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";

import {MuiPickersUtilsProvider,KeyboardDatePicker, KeyboardDateTimePicker,} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import "../App.css";


import { CleaningrequrestInterface } from "../models/ICleaningrequrest";
import { CleaningtypesInterface } from "../models/ICleaningtype";
import { TimerequrestsInterface } from "../models/ITimerequrest";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import NavbarCleaningRequest from "./NavberCleaningRequest";
 
function Alert(props: AlertProps) {
 return <MuiAlert elevation={6} variant="filled" {...props} />;
}
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   root: {flexGrow: 1},
   container: {marginTop: theme.spacing(2)},
   paper: {padding: theme.spacing(2),color: theme.palette.text.secondary},
   font:{fontFamily:"kanitlight",color:"black"},
   fontIn:{fontFamily:"kanitlight",fontSize:"14px"},
   fontHead:{fontFamily:"kanitlight"},
   //fontInSelect:{fontFamily:"kanitlight",fontSize:"14px",color:"#A6ACAF"},
 })
);
 
//Cleaningrequrest
//cleaningrequrest

function CleaningrequrestCreate() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

 const [cleaningtypes, setCleaningtypes] = React.useState<CleaningtypesInterface[]>([]);
 const [timerequrests, setTimerequrests] = React.useState<TimerequrestsInterface[]>([]);
 const [roomallocates, setRoomAllocates] = React.useState<RoomAllocateInterface[]>([]);

 const [cleaningrequrest, setCleaningrequrest] = React.useState<Partial<CleaningrequrestInterface>>({});

 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);
 const [errorMessage, setErrorMำssage] = React.useState("");
 
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
  const name = event.target.name as keyof typeof cleaningrequrest;
  setCleaningrequrest({
    ...cleaningrequrest,
    [name]: event.target.value,
  });
};

 const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

 const handleDateChange = (date: Date | null) => {
   setSelectedDate(date);
 };
 
 const handleInputChange = (
   event: React.ChangeEvent<{ id?: string; value: any }>
 ) => {
   const id = event.target.id as keyof typeof CleaningrequrestCreate;
   const { value } = event.target;
   setCleaningrequrest({ ...cleaningrequrest, [id]: value });
 };

 const getCleaningtype = async () => {
  fetch(`${apiUrl}/route/ListCleaningtype`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setCleaningtypes(res.data);
      } else {
        console.log("else");
      }
    });
};
const getTimerequrest = async () => {
  fetch(`${apiUrl}/route/ListTimerequrest`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setTimerequrests(res.data);
      } else {
        console.log("else");
      }
    });
};

const getRoomAllocate = async () => {
  fetch(`${apiUrl}/route/ListRoomAllocates`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setRoomAllocates(res.data);
      } else {
        console.log("else");
      }
    });
};

useEffect(() => {

  getCleaningtype();
  getTimerequrest();
  getRoomAllocate();
}, []);

 
const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

 function submit() {
   let data = {
    
     RoomAllocateID: convertType(cleaningrequrest.RoomAllocateID),
     CleaningtypeID: convertType(cleaningrequrest.CleaningtypeID),
     TimerequrestID: convertType(cleaningrequrest.TimerequrestID),
     Day: selectedDate,
     Tel:cleaningrequrest.Tel ?? "",
     Note:cleaningrequrest.Note ?? "",
     

   };
 
   const apiUrl = "http://localhost:8080/route/CreateCleaningrequrest";
   const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
 
 
  fetch(apiUrl, requestOptions)
  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
      console.log("บันทึกได้")
      setSuccess(true);
      //setErrorMำssage("")
    } else {
      console.log("บันทึกไม่ได้")
      setError(true);
      setErrorMำssage(res.error)
    }
  });
}
 
 return (
   <Container className={classes.container} maxWidth="md">
     <NavbarCleaningRequest/>
     <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="success">
         บันทึกข้อมูลสำเร็จ
       </Alert>
     </Snackbar>
     <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
       <Alert onClose={handleClose} severity="error">
         บันทึกข้อมูลไม่สำเร็จ: {errorMessage}
       </Alert>
     </Snackbar>
     <Paper className={classes.paper}>
       <Box display="flex">
         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
             className={classes.fontHead}
           >
             ทำการแจ้งทำความสะอาด
           </Typography>
         </Box>
       </Box>
       <Divider />
       <Grid container spacing={3} className={classes.root}>
        
         <Grid item xs={6} className={classes.font}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ห้องพัก</p>
              <Select
                className={classes.fontIn}
                native
                value={cleaningrequrest.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomAllocateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกห้องพัก
                </option>
                {roomallocates.map((item: RoomAllocateInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Number} 
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ประเภททำความสะอาด</p>
              <Select
                className={classes.fontIn}
                native
                value={cleaningrequrest.CleaningtypeID}
                onChange={handleChange}
                inputProps={{
                  name: "CleaningtypeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภททำความสะอาด
                </option>
                {cleaningtypes.map((item: CleaningtypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ช่วงเวลาทำความสะอาด</p>
              <Select
                className={classes.fontIn}
                native
                value={cleaningrequrest.TimerequrestID}
                onChange={handleChange}
                inputProps={{
                  name: "TimerequrestID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกช่วงเวลาทำความสะอาด
                </option>
                {timerequrests.map((item: TimerequrestsInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Period}
                  </option>
                ))}
              </Select>
            </FormControl>
            </Grid>

 {/***************************************************************** */}
 <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  InputProps={{
                    classes: {
                      input: classes.fontIn,
                    },
                  }}
                  name="Day"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label=""
                  
                  format="yyyy/MM/dd"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>เบอร์ติดต่อ</p>
             <TextField
               InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
               placeholder="หมายเลขโทรศัพท์ 10 หมายเลข"
               id="Tel"
               variant="outlined"
               type="string"
               size="medium"
               value={cleaningrequrest.Tel || ""}
               onChange={handleInputChange}
             />
           </FormControl>
           </Grid>
          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>หมายเหตุ</p>
             <TextField
               InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
               placeholder="จำเป็นต้องกรอก"
               id="Note"
               variant="outlined"
               type="string"
               size="medium"
               value={cleaningrequrest.Note || ""}
               onChange={handleInputChange}
             />
           </FormControl>
           </Grid>

<Grid item xs={6}>
  <FormControl fullWidth variant="outlined">

    <p>ค่าทำความสะอาด</p>
    <Select
      native
      disabled
>
      
      {cleaningtypes.map((item: CleaningtypesInterface) => (
        (cleaningrequrest["CleaningtypeID"] == item.ID)?(<option value={item.ID} key={item.ID}>
          {item.Price}
        </option>):""
      ))}

    </Select>
  </FormControl>

  </Grid>
         <Grid item xs={12}>
           <Button component={RouterLink} to="/cleaningrequrest" variant="contained" className={classes.font}>
             กลับ
           </Button>
           <Button
             style={{ float: "right" ,backgroundColor:"#f4adfd"}}
             onClick={submit}
             variant="contained"
             color="default"
             className={classes.font}
           >
             บันทึกข้อมูล
           </Button>
         </Grid>
       </Grid>
     </Paper>
   </Container>
 );
}
export default CleaningrequrestCreate;