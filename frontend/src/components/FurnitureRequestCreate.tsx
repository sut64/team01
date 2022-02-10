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


import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import "../App.css";


import { DormAttenInterface } from "../models/IDormAtten";
import { DormInventoryInterface } from "../models/IDormInventory";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import { FurnitureRequestInterface } from "../models/IFurnitureRequest";
import NavbarFurnitureRequest from "./NavbarFurnitureRequest";
 
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

function FurnitureRequestCreate() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

 const [dormattens, setDormAttens] = React.useState<DormAttenInterface>();
 const [dorminventory, setDormInventory] = React.useState<DormInventoryInterface[]>([]);
 const [roomallocates, setRoomAllocates] = React.useState<RoomAllocateInterface[]>([]);

 const [furniturerequest, setFurnitureRequest] = React.useState<Partial<FurnitureRequestInterface>>({});

 const [success, setSuccess] = React.useState(false);
 const [error, setError] = React.useState(false);
 const [errorMessage, setErrorMessage] = React.useState("");

 
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
  const name = event.target.name as keyof typeof furniturerequest;
  setFurnitureRequest({
    ...furniturerequest,
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
   const id = event.target.id as keyof typeof FurnitureRequestCreate;
   const { value } = event.target;
   setFurnitureRequest({ ...furniturerequest, [id]: value });
 };

 const getDormAtten = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/route/GetDormAtten/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        furniturerequest.DormAttenID = res.data.ID
        if (res.data) {
        setDormAttens(res.data);
        } else {
          console.log("else");
        }
      });
  };
 const getDormInventory = async () => {
  fetch(`${apiUrl}/route/ListDormInventory`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setDormInventory(res.data);
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
    getDormAtten();
    getDormInventory();
    getRoomAllocate();
}, []);

 
const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

 function submit() {
   let data = {
     DormAttenID: convertType(dormattens?.ID),
     DormInventoryID: convertType(furniturerequest.DormInventoryID),
     FurAmount:   convertType(furniturerequest.FurAmount),
     RoomAllocateID: convertType(furniturerequest.RoomAllocateID),
     PhoneNo:       furniturerequest.PhoneNo ?? "",
     DateRequest:   selectedDate,

   };
 
   const apiUrl = "http://localhost:8080/route/CreateFurnitureRequest";
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
         console.log("บันทึกสำเร็จ")
         setSuccess(true);
         setErrorMessage("")
       } else {
        console.log("บันทึกไม่สำเร็จ")
         setError(true);
         setErrorMessage(res.error)
       }
     });
 }
 
 return (
  <div>
    <NavbarFurnitureRequest/>
   <Container className={classes.container} maxWidth="md">
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
             บันทึกการยืมครุภัณฑ์
           </Typography>
         </Box>
       </Box>
       <Divider />
       <Grid container spacing={3} className={classes.root}>
         <Grid item xs={12} className={classes.font}>
           <p>ชื่อผู้บันทึก</p>
           <FormControl fullWidth variant="outlined">
              <Select
                className={classes.fontIn}
                native
                disabled
                value={furniturerequest.DormAttenID}
              >
                <option aria-label="None" value="">
                  {dormattens?.FirstName} {dormattens?.LastName}
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
              <p>ครุภัณฑ์ที่ต้องการยืม</p>
              <Select
                className={classes.fontIn}
                native
                value={furniturerequest.DormInventoryID}
                onChange={handleChange}
                inputProps={{
                  name: "DormInventoryID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกครุภัณฑ์ที่ต้องการยืม
                </option>
                {dorminventory.map((item: DormInventoryInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FurnitureName}
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
            <p>จำนวนครุภัณฑ์ที่ต้องการยืม</p>
                <FormControl fullWidth variant="outlined">
                    <TextField
                        id="FurAmount"
                        name="FurAmount"
                        variant="outlined"
                        type="string"
                        size="medium"
                        placeholder="กรุณากรอกจำนวนครุภัณฑ์ที่ต้องการยืม"
                        value={furniturerequest.FurAmount || ""}
                        onChange={handleInputChange}
                    />
                </FormControl>
        </Grid>
        <Grid item xs={6} className={classes.font}>
         <p>ชื่อผู้พักอาศัยที่ยืมครุภัณฑ์</p>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <Select
                className={classes.fontIn}
                native
                value={furniturerequest.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomAllocateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้รับ
                </option>
                {roomallocates.map((item: RoomAllocateInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DormTenant_FirstName} {item.DormTenant_LastName} 
                  </option>
                ))}
              </Select>
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
               id="PhoneNo"
               variant="outlined"
               type="string"
               size="medium"
               value={furniturerequest.PhoneNo || ""}
               onChange={handleInputChange}
             />
           </FormControl>
           </Grid>
           <Grid item xs={6}>
                <FormControl fullWidth variant="outlined" className={classes.font}>
                    <p>วันที่ทำการยืม</p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            InputProps={{
                            classes: {
                                input: classes.fontIn,
                            },
                            }}
                            margin="normal"
                            id="Day"
                            format="yyyy-MM-dd"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                            "aria-label": "change date",
                            }}
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
             </Grid>
            <Grid item xs={12}>
                <Button component={RouterLink} to="/furniturerequest" variant="contained" className={classes.font}>
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
   </div>
 );
}
export default FurnitureRequestCreate;