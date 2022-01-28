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
import { MeterRecordInterface } from "../models/IMeterRecord";
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import DateFnsUtils from "@date-io/date-fns";
import "../App.css";
import { DormAttenInterface } from "../models/IDormAtten";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import { UnitpriceInterface} from "../models/IUnitprice";


 
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
 
function MeterRecordCreate() {
 const classes = useStyles();
 const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());
 const [dormattens, setDormAttens] = React.useState<DormAttenInterface[]>([]);
 const [unitprice, setUnitprice] = React.useState<UnitpriceInterface[]>([]);
 const [roomallocates, setRoomAllocates] = React.useState<RoomAllocateInterface[]>([]);
 const [meterrecord, setMeterRecord] = React.useState<Partial<MeterRecordInterface>>({});


 const [success, setSuccess] = useState(false);
 const [error, setError] = useState(false);

 const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
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
    const name = event.target.name as keyof typeof meterrecord;
    setMeterRecord({
      ...meterrecord,
      [name]: event.target.value,
    });
  };


 const handleDateChange = (date: Date | null) => {
   setSelectedDate(date);
 };
 
 const handleInputChange = (
   event: React.ChangeEvent<{ id?: string; value: any }>
 ) => {
   const id = event.target.id as keyof typeof MeterRecordCreate;
   const { value } = event.target;
  setMeterRecord({ ...meterrecord, [id]: value });
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

const getUnitprice = async () => {
    const uid = Number(localStorage.getItem("uid"));
    fetch(`${apiUrl}/route/GetUnitprice/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setUnitprice(res.data);
        } else {
          console.log("else");
        }
      });
  };

useEffect(() => {
  getDormAtten();
  getUnitprice();
  getRoomAllocate();
}, []);

 
const convertType = (data: string | number | undefined) => {
  let val = typeof data === "string" ? parseInt(data) : data;
  return val;
};

 function submit() {
   let data = {
     DormAttenID: convertType(meterrecord.DormAttenID),
     RoomAllocateID: convertType(meterrecord.RoomAllocateID),
     UnitpriceID: convertType(meterrecord.UnitpriceID),
     Sum: typeof meterrecord.Sum === "string" ? parseInt(meterrecord.Sum) : 0,
     Uele: meterrecord.Uele ?? "",
     Uwat: meterrecord.Uwat ?? "",
     Date: selectedDate,

   };
   console.log(data)

   const requestOptionsPost = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
 
  fetch(`${apiUrl}/route/CreateMeterRecord`, requestOptionsPost)
  .then((response) => response.json())
  .then((res) => {
    if (res.data) {
      console.log("บันทึกได้")
      setSuccess(true);
    } else {
      console.log("บันทึกไม่ได้")
      setError(true);
    }
     });
 }
 
 return (
  <Container className={classes.container} maxWidth="md">
    <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success">
        บันทึกข้อมูลสำเร็จ
      </Alert>
    </Snackbar>
    <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        บันทึกข้อมูลไม่สำเร็จ
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
          >
            บันทึกค่าน้ำและค่าไฟฟ้า
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ชื่อผู้บันทึก</p>
            <Select
              native
              value={meterrecord.DormAttenID}
              onChange={handleChange}
              inputProps={{
                name: "DormAttenID",
              }}
            >
              <option aria-label="None" value="">
              </option>
              {dormattens.map((item: DormAttenInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.FirstName}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>กรุณาเลือกห้อง</p>
            <Select
              native
              value={meterrecord.RoomAllocateID}
              onChange={handleChange}
              inputProps={{
                name: "ResolutionID",
              }}
            >
              <option aria-label="None" value="">
                กรุณาเลือกห้อง
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
            <p>หน่วยไฟฟ้าที่ใช้</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Uele"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกหน่วยไฟฟ้าที่ใช้"
                value={meterrecord.Uele || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ราคาไฟฟ้าหน่วยต่อบาท</p>
            <Select
              native
              value={meterrecord.UnitpriceID}
              onChange={handleChange}
              inputProps={{
                name: "UnitpriceID",
              }}
            >
              <option aria-label="None" value="">
              </option>
              {unitprice.map((item: UnitpriceInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Uperbath}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

          <Grid item xs={6}>
            <p>หน่วยน้ำที่ใช้</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Uwat"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกหน่วยน้ำที่ใช้"
                value={meterrecord.Uwat || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <p>ราคาน้ำหน่วยต่อบาท</p>
            <Select
              native
              value={meterrecord.UnitpriceID}
              onChange={handleChange}
              inputProps={{
                name: "UnitpriceID",
              }}
            >
              <option aria-label="None" value="">
              </option>
              {unitprice.map((item: UnitpriceInterface) => (
                <option value={item.ID} key={item.ID}>
                  {item.Uperbath}
                </option>
              ))}
            </Select>
          </FormControl>
        </Grid>

        
        <Grid item xs={6}>
            <p>รวมค่าน้ำค่าไฟฟ้า</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Uwat"
                variant="outlined"
                type="string"
                size="medium"
                value={meterrecord.Uwat || ""}
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
                 id="Date"
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
           <Button component={RouterLink} to="/meterrecord" variant="contained">
             Back
           </Button>
           <Button
             style={{ float: "right" }}
             onClick={submit}
             variant="contained"
             color="primary"
           >
             Submit
           </Button>
         </Grid>
       </Grid>
     </Paper>
   </Container>
 );
}
 
export default MeterRecordCreate;