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

import { format } from 'date-fns'

import { BillInterface } from "../models/IBill";
import NavbarBill from "./NavbarBill"; 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2),minWidth: 1200},
   table: { minWidth: 1100 },
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight",color:"black"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
  
 })
);

 
function Bills() {
  const classes = useStyles();
  const [bills, setBills] = useState<BillInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getBills = async () => {
    fetch(`${apiUrl}/route/ListBills`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setBills(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getBills();
  }, []); 

  return (
    <div>
      <NavbarBill/>
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
              ข้อมูลการบันทึกการชำระเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              style={{ float: "right" ,backgroundColor:"#f4adfd"}}
              component={RouterLink}
              to="/bill/create"
              variant="contained"
              color="default"
              className={classes.font}
            >
              สร้างข้อมูลบันทึกการชำระเงิน
            </Button>
          </Box>
        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="3%" className={classes.font}>
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="22%" className={classes.font}>
                  วันที่และเวลา
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ผู้บันทึก
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  เลขห้อง
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ค่าเช่าห้อง
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ค่าน้ำ-ไฟ
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ค่าซ่อมบำรุง
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ค่าทำความสะอาด
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  ช่องทางการชำระ
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  ยอดรวม
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bills.map((item: BillInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" className={classes.font}>{item.ID}</TableCell>
                  <TableCell align="center" className={classes.font}>{format((new Date(item.BillDateTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.DormAtten.FirstName}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.RoomAllocate.Number}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.Room.Roomtypes.Price}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.MeterRecord.Sum}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.RepairRequest.RepairType.Cost}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.Cleaningrequrest.Cleaningtype.Price}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.PayByCash? "เงินสด":"ช่องทางอื่นๆ"}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.AmountPaid.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Bills;