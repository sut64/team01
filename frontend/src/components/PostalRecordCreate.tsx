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
import { Postal_RecordInterface } from "../models/IPostal_Record";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import "../App.css";
import { DormAttenInterface } from "../models/IDormAtten";
import { DormTenantInterface } from "../models/IDormTenant";
import { CarrierInterface } from "../models/ICarrier";
import { PostalInterface } from "../models/IPostal";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import NavbarPostalRecs from "./NavbarPostalRecs";
 
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
   
   //fontInSelect:{fontFamily:"kanitlight",fontSize:"14px",color:"#A6ACAF"},
 })
);
 
function PostalRecordCreate() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
 const [dormattens, setDormAttens] = React.useState<DormAttenInterface>();
 const [dormtenants, setDormTenants] = React.useState<DormTenantInterface[]>([]);
 const [carriers, setCarriers] = React.useState<CarrierInterface[]>([]);
 const [postals, setPostals] = React.useState<PostalInterface[]>([]);
 const [roomallocates, setRoomAllocates] = React.useState<RoomAllocateInterface[]>([]);
 const [postalrecord, setPostalRecord] = React.useState<Partial<Postal_RecordInterface>>({});
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
  const name = event.target.name as keyof typeof postalrecord;
  setPostalRecord({
    ...postalrecord,
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
   const id = event.target.id as keyof typeof PostalRecordCreate;
   const { value } = event.target;
   setPostalRecord({ ...postalrecord, [id]: value });
 };

 const getCarrier = async () => {
  fetch(`${apiUrl}/route/ListCarriers`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setCarriers(res.data);
      } else {
        console.log("else");
      }
    });
};
const getPostal = async () => {
  fetch(`${apiUrl}/route/ListPostals`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setPostals(res.data);
      } else {
        console.log("else");
      }
    });
};
const getDormAtten = async () => {
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
const getDormTenant = async () => {
  fetch(`${apiUrl}/route/ListDormTenants`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        setDormTenants(res.data);
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
  getDormTenant();
  getCarrier();
  getPostal();
  getRoomAllocate();
}, []);

 
const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

 function submit() {
   let data = {
     DormAttenID: convertType(dormattens?.ID),
     //DormTenantID: convertType(postalrecord.DormTenantID),
     RoomAllocateID: convertType(postalrecord.RoomAllocateID),
     PostalID: convertType(postalrecord.PostalID),
     CarrierID: convertType(postalrecord.CarrierID),
     Amount: typeof postalrecord.Amount === "string" ? parseInt(postalrecord.Amount) : 0,
     Tracking:postalrecord.Tracking ?? "",
     RecordTime: selectedDate,

   };
 
   const apiUrl = "http://localhost:8080/route/CreatePostalRecord";
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
       } else {
         console.log("บันทึกไม่ได้")
         setError(true);
         setErrorMessage(res.error)
       }
     });
 }
 
 return (
   <Container className={classes.container} maxWidth="md">
     <NavbarPostalRecs/>
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
             className={classes.font}
           >
             บันทึกรายการพัสดุ
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
                value={postalrecord.DormAttenID}
                /*onChange={handleChange}
                inputProps={{
                  name: "DormAttenID",
                }}*/
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
         <Grid item xs={6} className={classes.font}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ชื่อผู้รับ</p>
              <Select
                className={classes.fontIn}
                native
                value={postalrecord.RoomAllocateID}
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
                    {item.Number} {item.DormTenant_FirstName} {item.DormTenant_LastName} 
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>จัดส่งโดย</p>
              <Select
                className={classes.fontIn}
                native
                value={postalrecord.CarrierID}
                onChange={handleChange}
                inputProps={{
                  name: "CarrierID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้จัดส่ง
                </option>
                {carriers.map((item: CarrierInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.CarrierName}
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
         <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ประเภทพัสดุ</p>
              <Select
                className={classes.fontIn}
                native
                value={postalrecord.PostalID}
                onChange={handleChange}
                inputProps={{
                  name: "PostalID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทพัสดุ
                </option>
                {postals.map((item: PostalInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Type}
                  </option>
                ))}
              </Select>
            </FormControl>
         </Grid>
         <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" className={classes.font}>
            <p>จำนวน</p>
            <TextField
              InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
              placeholder="กรุณากรอกจำนวน"
              id="Amount"
              name="Amount"
              variant="outlined"
              type="uint"
              size="medium"
              value={postalrecord.Amount || ""}
              onChange={handleInputChange}
            />
          </FormControl>
          </Grid>
          <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>Tracking</p>
             <TextField
               InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
               placeholder="หากไม่ทราบหมายเลขกรุณากรอก ' - '"
               id="Tracking"
               variant="outlined"
               type="string"
               size="medium"
               value={postalrecord.Tracking || ""}
               onChange={handleInputChange}
             />
           </FormControl>
         </Grid>
 
         <Grid item xs={6}>
           <FormControl fullWidth variant="outlined" className={classes.font}>
             <p>วันที่มาส่ง</p>
             <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <KeyboardDatePicker
                 InputProps={{
                  classes: {
                    input: classes.fontIn,
                  },
                }}
                 margin="normal"
                 id="RecordTime"
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
           <Button component={RouterLink} to="/postal_record" variant="contained" className={classes.font}>
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
 
export default PostalRecordCreate;