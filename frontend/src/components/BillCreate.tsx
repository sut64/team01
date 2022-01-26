import { useEffect, useState } from "react";
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
//import { MeterRecordInterface } from "../models/IMeterRecord";
//import { CleaningRequestInterface } from "../models/ICleaningRequest";
import { BillInterface } from "../models/IBill";
/*
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
  })
);

function BillCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [dormattens, setDormAttens] = useState<DormAttenInterface[]>([]);
  const [RoomAllocates, setRoomAllocates] = useState<RoomAllocateInterface[]>([]);
  /* 
  const [MeterRecords, setMeterRecords] = useState<MeterRecordInterface[]>([]);
  const [CleaningRequests, setCleaningRequests] = useState<CleaningRequestInterface[]>([]);
  
  *//*
  const [bill, setBill] = useState<Partial<BillInterface>>(
    {}
  );

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

  // get ต่างๆ ======================================================
  const getDormAttens = async () => {
    fetch(`${apiUrl}/route/ListDormAtten`, requestOptions)
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

  /* 
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

  const getCleaningRequests = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListCleaningRequests`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setCleaningRequests(res.data);
        } else {
          console.log("else");
        }
      });
  };  
  *//*
  

  useEffect(() => {
    getDormAttens();
    getRoomAllocates();
    /* 
    getMeterRecords();
    getCleaningRequests();
    *//*
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      BillDateTime : selectedDate,
      DormAttenID: convertType(bill.DormAttenID),
      RoomAllocateID: convertType(bill.RoomAllocateID),
      /* 
      MeterRecordID: convertType(bill.MeterRecordID),
      CleaningRequestID: convertType(bill.CleaningRequestID),
      *//*
      PayByCash: convertType(bill.PayByCash),
      AmountPaid: convertType(bill.AmountPaid),
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

    fetch(`${apiUrl}/route/CreatBill`, requestOptionsPost)
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
              บันทึกการชำระเงิน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้ดูแลหอพัก</p>
              <Select
                native
                value={roomallocate.DormAttenID}
                onChange={handleChange}
                inputProps={{
                  name: "DormAttenID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้ดูแลหอพัก
                </option>
                {dormattens.map((item: DormAttenInterface) => (
                  <option value={dormattens?.ID} key={dormattens?.ID}>
                    {dormattens?.FirstName}{dormattens?.LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>หมายเลขห้อง</p>
              <Select
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
                {roomallocates.map((item: RoomAllocateInterface) => (
                  <option value={item.ID} key={item.ID}>
                   {item.Number}
                  </option>
                ))}
                
              </Select>
            </FormControl>
                </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ใบบันทึกห้องพัก(ราคา)</p>
              <Select
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
                {roomallocates.map((item: RoomAllocateInterface) => (
                  (bill["RoomAllocateID"] == item.ID)?(<option value={item.ID} key={item.ID}>  {/*ผิด แน่ๆ แต่ยังแก้ไม่ได้*//*}
                    {item.ID} ({item.Room.Roomtypes.Price})
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* 
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ใบบันทึกน้ำ-ไฟ(ราคา)</p>
              <Select
                native
                value={bill.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "MeterRecordID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกใบบันทึกน้ำ-ไฟ(ราคา)
                </option>
                {meterrecords.map((item: MeterRecordInterface) => (
                  (bill["MeterRecordID"] == item.ID)?(<option value={item.ID} key={item.ID}>
                    {item.ID} ({item.Price})
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
            <p>ใบบันทึกทำความสะอาด(ราคา)</p>
              <Select
                native
                value={bill.RoomAllocateID}
                onChange={handleChange}
                inputProps={{
                  name: "CleaningRequestID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกใบบันทึกทำความสะอาด(ราคา)
                </option>
                {cleaningrequests.map((item: CleaningRequestInterface) => (
                  (bill["CleaningRequestID"] == item.ID)?(<option value={item.ID} key={item.ID}>
                    {item.ID} ({item.Price})
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>
          *//*}

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>วันที่และเวลา</p>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  name="WatchedTime"
                  value={selectedDate}
                  onChange={handleDateChange}
                  label="กรุณาเลือกวันที่และเวลา"
                  minDate={new Date("2018-01-01T00:00")}
                  format="yyyy/MM/dd hh:mm a"
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/bills"
              variant="contained"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              variant="contained"
              onClick={submit}
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default BillCreate;*/