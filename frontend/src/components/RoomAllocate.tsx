import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { RoomAllocateInterface } from "../models/IRoomAllocate";
import { format } from 'date-fns'
import NavbarRoomAllocate from "./NavbarRoomAllocate";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {marginTop: theme.spacing(2),minWidth: 1200},
   table: { minWidth: 1100 },
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight",color:"black"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
  })
);

function RoomAllocate() {
  const classes = useStyles();
  const [roomallocate, setRoomAllocate] = useState<RoomAllocateInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRoomAllocate = async () => {
    fetch(`${apiUrl}/route/ListRoomAllocates`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRoomAllocate(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRoomAllocate();
  }, []);

  return (
    <div>
      <NavbarRoomAllocate/>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              className={classes.font}
            >
              ข้อมูลการจัดสรรห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              style={{ float: "right" ,backgroundColor:"#f4adfd"}}
              component={RouterLink}
              to="/roomallocate/create"
              variant="contained"
              color="default"
              className={classes.font}
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="2%" className={classes.font}>
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="5%" className={classes.font}>
                  หมายเลขห้อง
                </TableCell>
                {/*<TableCell align="center" width="10%" className={classes.font}>
                  ประเภทห้อง
                </TableCell>
                <TableCell align="center" width="7%" className={classes.font}>
                  ราคาห้อง
                </TableCell>*/}
                <TableCell align="center" width="7%" className={classes.font}>
                  จำนวนผู้เข้าพัก
                </TableCell>
                <TableCell align="center" width="6%" className={classes.font}>
                  ชื่อผู้เช่าห้องพัก
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ชื่อผู้ดูแลหอพัก
                </TableCell>
                <TableCell align="center" width="12%"className={classes.font}>
                  วันที่และเวลา
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  หมายเหตุ
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomallocate.map((item: RoomAllocateInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" className={classes.fontIn}>{item.ID}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.Room.Number}</TableCell>
                  {/*<TableCell align="center" className={classes.fontIn}>{item.Room.Roomtypes.Name}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.Room.Roomtypes.Price}</TableCell>*/}
                  <TableCell align="center" className={classes.fontIn}>{item.People}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.DormTenant.DormTenant_FirstName}  {item.DormTenant.DormTenant_LastName}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.DormAtten.FirstName}  {item.DormAtten.LastName}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{format((new Date(item.EntryTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.Note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default RoomAllocate;