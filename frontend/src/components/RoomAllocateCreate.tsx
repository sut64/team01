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

import { DormTenantInterface } from "../models/IDormTenant";
import { DormAttenInterface } from "../models/IDormAtten";
import { RoomTypesInterface } from "../models/IRoomTypes";
import { RoomInterface } from "../models/IRoom";
import { RoomAllocateInterface } from "../models/IRoomAllocate";

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

function RoomAllocateCreate() {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const [dormtenants, setDormTenants] = useState<DormTenantInterface[]>([]);
  const [dormattens, setDormAttens] = useState<DormAttenInterface[]>([]);
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [roomtypes, setRoomTypes] = useState<RoomTypesInterface[]>([]);
  const [roomallocate, setRoomAllocate] = useState<Partial<RoomAllocateInterface>>(

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

  const getDormTenants = async () => {
    fetch(`${apiUrl}/route/ListDormTenant`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          setDormTenants(res.data);
        } else {
          console.log("else");
        }
      });
  };

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

  const getRoomtypes = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/route/ListRoomType`, requestOptions)
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
    fetch(`${apiUrl}/route/ListRoom`, requestOptions)
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
    getDormAttens();
    getRooms();
    getRoomtypes();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  function submit() {
    let data = {
      DormAttenID: convertType(roomallocate.DormAttenID),
      RoomID: convertType(roomallocate.RoomID),
      DormTenantID: convertType(roomallocate.DormTenantID),
      EntryTime: selectedDate,
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

    fetch(`${apiUrl}/route/CreatRoomAllocate`, requestOptionsPost)
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
              บันทึกการจัดสรรห้องพัก
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้เช่าห้องพัก</p>
              <Select
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
                    {item.Pid}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
              <p>ประเภทห้อง</p>
              <Select
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
            <FormControl fullWidth variant="outlined">
            <p>หมายเลขห้อง</p>
              <Select
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
              to="/roomallocates"
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

export default RoomAllocateCreate;