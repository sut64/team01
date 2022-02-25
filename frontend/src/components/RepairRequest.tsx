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
import { RepairRequestinterface } from "../models/IRepairRequest";
import { format } from 'date-fns'
import NavbarRepairRequest from "./NavbarRepairRequest";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {marginTop: theme.spacing(2),minWidth: 1200},
   table: { minWidth: 1100 },
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight",color:"black"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
  })
);

function RepairRequest() {
  const classes = useStyles();
  const [repairrequest, setRepairRequest] = useState<RepairRequestinterface[]>([]);
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const getRepairRequest = async () => {
    fetch(`${apiUrl}/route/ListRepairRequest`, requestOptions)   
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setRepairRequest(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getRepairRequest();
  }, []);

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
      <NavbarRepairRequest/>
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
              className={classes.font}
            >
              ข้อมูลกการแจ้งซ่อม
            </Typography>
          </Box>
          <Box>
            <Button
              style={{ float: "right" ,backgroundColor:"#f4adfd"}}
              component={RouterLink}
              to="/repairrequest/create"  
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
                <TableCell align="center" width="5%" className={classes.font}>
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ผู้แจ้ง
                </TableCell>
                <TableCell align="center" width="10%" className={classes.font}>
                  ห้องพักที่แจ้ง
                </TableCell>
                <TableCell align="center" width="12%" className={classes.font}>
                  วันที่แจ้ง
                </TableCell>
                <TableCell align="center" width="12%" className={classes.font}>
                  เบอร์ติดต่อ
                </TableCell>
                <TableCell align="center" width="8%" className={classes.font}>
                  ประเภทการแจ้งซ่อม
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  ประเภทงานซ่อม
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  สิ่งของที่เสียหาย
                </TableCell>
                <TableCell align="center" width="15%" className={classes.font}>
                  อาการ/ปัญหา
                </TableCell>
                <TableCell align="center" width="15%"className={classes.font}>
                  วันที่และเวลาที่นัดหมาย
                </TableCell>
                <TableCell align="center" width="15%"className={classes.font}>
                  อนุญาตเข้าห้องพัก
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {repairrequest.map((item: RepairRequestinterface) => (
                <TableRow key={item.ID}>
                  <TableCell align="center" className={classes.fontIn}>{item.ID}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.DormTenant.DormTenant_FirstName } {item.DormTenant.DormTenant_LastName}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.RoomAllocate.Number}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{format((new Date(item.RecordDate)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                 
                  <TableCell align="center" className={classes.fontIn}>{item.TelNumber}</TableCell>

                  <TableCell align="center" className={classes.fontIn}>{item.RepairType.TypeName}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.DormInventory.DormInventoryType.InvenType}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.DormInventory.FurnitureName}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{item.ProblemNote}</TableCell>
                  <TableCell align="center" className={classes.fontIn}>{format((new Date(item.RequestDate)), 'dd MMMM yyyy hh:mm a')}</TableCell>
                  <TableCell align="center" className={classes.font}>{item.EntryPermission? "อนุญาต":"ไม่อนุญาต"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default RepairRequest;