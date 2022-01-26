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
import { BillInterface } from "../models/IBill"; //แก้เป็นของตัวเอง
import { format } from 'date-fns'

/*
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

function Bill() {
  const classes = useStyles();
  const [bill, setBill] = useState<BillInterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getBill = async () => {
    fetch(`${apiUrl}/route/ListBill`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setBill(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getBill();
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
              ข้อมูลการบันทึกการชำระเงิน
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/bill/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูลบันทึกการชำระเงิน
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
                  วันที่และเวลา
                </TableCell>
                <TableCell align="center" width="20%">
                  ผู้ดูแลหอพัก(ผู้บันทึก)
                </TableCell>
                <TableCell align="center" width="20%">
                  หมายเลขห้อง
                </TableCell>
                <TableCell align="center" width="20%">
                  ค่าเช่าห้อง
                </TableCell>

                {/*
                <TableCell align="center" width="20%">
                  ค่าน้ำ-ไฟ
                </TableCell>
                <TableCell align="center" width="20%">
                  ค่าทำความสะอาด
                </TableCell>
                *//*}

                <TableCell align="center" width="20%">
                  จ่ายด้วยเงินสดหรือไม่?
                </TableCell>
                <TableCell align="center" width="30%">
                  จำนวนเงินทั้งหมด
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bill.map((item: BillInterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center">{item.ID}</TableCell>
                  <TableCell align="center">{format((new Date(item.EntryTime)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center">{item.DormAtten.FirstName}</TableCell>
                  <TableCell align="center">{item.RoomNumber}</TableCell>
                  <TableCell align="center">{item.RoomAllocate.Room.Roomtypes.Price}</TableCell>
                  {/* 
                  <TableCell align="center">{item.MeterRecord.Price}</TableCell>
                  <TableCell align="center">{item.CleaningRequest.Price}</TableCell>
                  *//*}
                  <TableCell align="center">{item.PayByCash}</TableCell>
                  <TableCell align="center">{item.AmountPaid}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

/*
export default Bill;
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
*/
