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


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
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
    fetch(`${apiUrl}/route/ListRoomAllocate`, requestOptions)
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
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลการจัดสรรห้องพัก
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/roomallocate/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="20%">
                  หมายเลขห้อง
                </TableCell>
                <TableCell align="center" width="20%">
                  ประเภทห้อง
                </TableCell>
                <TableCell align="center" width="20%">
                  ราคาห้อง
                </TableCell>
                <TableCell align="center" width="20%">
                  ชื่อผู้เช่าห้องพัก
                </TableCell>
                <TableCell align="center" width="20%">
                  ชื่อผู้ดูแลหอพัก
                </TableCell>
                <TableCell align="center" width="30%">
                  วันที่และเวลา
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomallocate.map((item: RoomAllocateInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{item.Room.Number}</TableCell>
                  <TableCell align="center">{item.Room.Roomtypes.Name}</TableCell>
                  <TableCell align="center">{item.Room.Roomtypes.Price}</TableCell>
                  <TableCell align="center">{item.DormTenant.DormTenant_FirstName}</TableCell>
                  <TableCell align="center">{item.DormAtten.DormAtten_Firstname}</TableCell>
                  <TableCell align="center">{format((new Date(item.EntryTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
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