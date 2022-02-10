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
import TextField from "@material-ui/core/TextField";

import { DormTenantInterface } from "../models/IDormTenant";
import { DormAttenInterface } from "../models/IDormAtten";
import { RoomTypesInterface } from "../models/IRoomTypes";
import { RoomInterface } from "../models/IRoom";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import NavbarRoomAllocate from "./NavbarRoomAllocate";
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

function RoomAllocateCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [dormtenants, setDormTenants] = useState<DormTenantInterface[]>([]);
  const [dormattens, setDormAttens] = React.useState<DormAttenInterface>();
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [roomtypes, setRoomTypes] = useState<RoomTypesInterface[]>([]);
  const [roomallocate, setRoomAllocate] = useState<Partial<RoomAllocateInterface>>(
    {}
  );

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    const name = event.target.name as keyof typeof roomallocate;
    setRoomAllocate({
      ...roomallocate,
      [name]: event.target.value,
    });
  };

  const handleDateChange = (date: Date | null) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof RoomAllocateCreate;
    const { value } = event.target;
    setRoomAllocate({ ...roomallocate, [id]: value });
  };

  const getDormTenants = async () => {
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

  const getRoomtypes = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListRoomTypes`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setRoomTypes(res.data);
        } else {
          console.log("else");
        }
      });
  };

  const getRooms = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListRooms`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        roomallocate.RoomID = res.data.ID
        if (res.data) {
          setRooms(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getDormTenants();
    getDormAtten();
    getRooms();
    getRoomtypes();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      DormAttenID: convertType(dormattens?.ID),
      RoomID: convertType(roomallocate.RoomID),
      //RoomTypesID: rooms.,
      People: typeof roomallocate.People === "string" ? parseInt(roomallocate.People) : 0,
      Note:roomallocate.Note ?? "",
      DormTenantID: convertType(roomallocate.DormTenantID),
      EntryTime: selectedDate,
    };

    console.log(data)
    const apiUrl = "http://localhost:8080/route/CreateRoomAllocate";
    const requestOptionsPost = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    fetch(apiUrl, requestOptionsPost)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          console.log("บันทึกได้")
          setSuccess(true)
          setErrorMessage("");
        } else {
          console.log("บันทึกไม่ได้")
          setError(true)
          setErrorMessage(res.error);
        }
      });
  }

  return (
    <Container className={classes.container} maxWidth="md">
       <NavbarRoomAllocate/>
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
              บันทึกการจัดสรรห้องพัก
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ผู้เช่าห้องพัก</p>
              <Select
                className={classes.fontIn}
                native
                value={roomallocate.DormTenantID}
                onChange={handleChange}
                inputProps={{
                  name: "DormTenantID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกผู้เช่าห้องพัก
                </option>
                {dormtenants.map((item: DormTenantInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.DormTenant_FirstName} {item.DormTenant_LastName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} className={classes.font}>
           <p>ชื่อผู้บันทึก</p>
           <FormControl fullWidth variant="outlined">
              <Select
                //className={classes.fontIn}
                native
                disabled
                value={roomallocate.DormAttenID}
                
              >
                <option aria-label="None" value="">
                  {dormattens?.FirstName} {dormattens?.LastName}
                </option>
                
              </Select>
            </FormControl>
         </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
              <p>ประเภทห้อง</p>
              <Select
                className={classes.fontIn}
                native
                value={roomallocate.RoomtypesID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomtypesID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกประเภทห้อง
                </option>
                {roomtypes.map((item: RoomTypesInterface) => (
                  <option value={item.ID} key={item.ID}>
                   {item.Name}
                  </option>
                ))}
                
              </Select>
            </FormControl>
                </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined" className={classes.font}>
            <p>หมายเลขห้อง</p>
              <Select
                className={classes.fontIn}
                native
                value={roomallocate.RoomID}
                onChange={handleChange}
                inputProps={{
                  name: "RoomID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกหมายเลขห้อง
                </option>
                {rooms.map((item: RoomInterface) => (
                  (roomallocate["RoomtypesID"] == item.RoomtypesID)?(<option value={item.ID} key={item.ID}>
                    {item.Number}
                  </option>):""
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl fullWidth variant="outlined" className={classes.font}>
            <p>จำนวนผู้เข้าพัก</p>
            <TextField
              InputProps={{
                classes: {
                  input: classes.fontIn,
                },
              }}
              placeholder="กรุณากรอกจำนวนผู้เข้าพัก"
              id="People"
              name="People"
              variant="outlined"
              type="uint"
              size="medium"
              value={roomallocate.People || ""}
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
               placeholder="หากไม่มีหมายเหตุกรุณากรอก ' - '"
               id="Note"
               variant="outlined"
               type="string"
               size="medium"
               value={roomallocate.Note || ""}
               onChange={handleInputChange}
             />
           </FormControl>
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
                  name="EntryTime"
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
            <Button
              component={RouterLink}
              to="/roomallocate"
              variant="contained"
              className={classes.font}
            >
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

export default RoomAllocateCreate;