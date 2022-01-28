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

import { DormAttenInterface } from "../models/IDormAtten";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import { MeterRecordInterface } from "../models/IMeterRecord";
//import { CleaningrequrestInterface } from "../models/ICleaningrequrest";
import { BillInterface } from "../models/IBill";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import NavbarBill from "./NavbarBill";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

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

function BillCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [dormattens, setDormAttens] = React.useState<DormAttenInterface>();
  const [RoomAllocates, setRoomAllocates] = useState<RoomAllocateInterface[]>([]); 
  const [MeterRecords, setMeterRecords] = useState<MeterRecordInterface[]>([]);
  //const [Cleaningrequrests, setCleaningrequrests] = useState<CleaningrequrestInterface[]>([]);
  const [bill, setBill] = useState<Partial<BillInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  
  const [state, setState] = useState({
    PayByCash: true,
  });

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
    const name = event.target.name as keyof typeof bill;
    setBill({
      ...bill,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof bill;  
    setState({ ...state, [name]: event.target.checked });

    setBill({
      ...bill,
      [name]: event.target.checked,
    });
  };

  // get ต่างๆ ======================================================
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

  const getRoomAllocates = async () => {
    let uid = localStorage.getItem("uid");
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

  const getMeterRecords = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListMeterRecords`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setMeterRecords(res.data);
        } else {
          console.log("else");
        }
      });
  };
  
  useEffect(() => {
    getDormAtten();
    getRoomAllocates();
    getMeterRecords();
  }, []);

  const convertType = (data: string | number | undefined | boolean) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      BillDateTime : selectedDate,
      DormAttenID: convertType(dormattens?.ID),
      RoomAllocateID: convertType(bill.RoomAllocateID),
      MeterRecordID: convertType(bill.MeterRecordID),
      //CleaningrequrestID: convertType(bill.CleaningrequrestID),
      PayByCash: bill.PayByCash,
      AmountPaid: convertType(bill.AmountPaid),
    };

    const apiUrl = "http://localhost:8080/route/CreateBill";
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
         setSuccess(true);
       } else {
         setError(true);
       }
     });
 }
 
  return (
    <Container className={classes.container} maxWidth="md">
      <NavbarBill/>
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
              className={classes.font}
            >
              บันทึกการชำระเงิน
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
                value={bill.DormAttenID}
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
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขห้อง</p>
              <Select
                className={classes.fontIn}
                native
                value={bill.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomAllocateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้อง
                </option>
                {RoomAllocates.map((item: RoomAllocateInterface) => (
                  <option value={item.ID} key={item.ID}>
                   {item.Number}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6} className={classes.font}>
            <FormControl fullWidth variant="outlined">
            <p>ใบบันทึกห้องพัก(ราคา)</p>
              <Select
                className={classes.fontIn}
                native
                value={bill.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomAllocateID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกใบบันทึกห้องพัก(ราคา)
                </option>
                {RoomAllocates.map((item: RoomAllocateInterface) => (
                  (bill["RoomAllocateID"] == item.ID)?(<option value={item.ID} key={item.ID}>  {/*ผิด แน่ๆ แต่ยังแก้ไม่ได้*/}
                    {item.ID} ({item.Room.Roomtypes.Price})
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.font}>
            <FormControl fullWidth variant="outlined">
            <p>ใบบันทึกน้ำ-ไฟ(ราคา)</p>
              <Select
                className={classes.fontIn}
                native
                value={bill.MeterRecordID}
                onChange={handleChange}
                inputProps={{
                  name: "MeterRecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกใบบันทึกน้ำ-ไฟ(ราคา)
                </option>
                {MeterRecords.map((item: MeterRecordInterface) => (
                  (bill["RoomAllocateID"] == item.RoomAllocateID)?(<option value={item.ID} key={item.ID}>
                    {item.ID} ({item.Sum})
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} className={classes.font}>
            <p>จ่ายด้วยเงินสดหรือไม่</p>
          </Grid>
          <Grid item xs={3} >
          <FormControlLabel
              
              control={<Checkbox checked={state.PayByCash} 
              id="PayByCash"
              onChange={handleCheckboxChange}
              
              inputProps={{ 
              name : 'PayByCash'}}
              
              name="PayByCash" />}
              label="Yes!"/> 

          </Grid>
          

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  InputProps={{
                    classes: {
                      input: classes.fontIn,
                    },
                  }}
                  name="BillDateTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label=""
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
           <Button component={RouterLink} to="/bill" variant="contained" className={classes.font}>
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

export default BillCreate;