import React, { useEffect } from "react";
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
import { MeterRecordInterface } from "../models/IMeterRecord";
 
import moment from 'moment';
 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2)},
   table: { minWidth: 650},
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight",color:"black"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
 })
);
 
function MeterRecord() {
 const classes = useStyles();
 const [meterrecords, setMeterRecords] = React.useState<MeterRecordInterface[]>([]);
 
 const getMeterRecords = async () => {
   const apiUrl = "http://localhost:8080/route/ListMeterRecords";
   const requestOptions = {
     method: "GET",
     headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
     "Content-Type": "application/json",},
   };
 
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       console.log(res.data);
       if (res.data) {
         setMeterRecords(res.data);
       } else {
         console.log("else");
       }
     });
 };
 
 useEffect(() => {
   getMeterRecords();
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
             className={classes.font}
           >
            บันทึกค่าน้ำและค่าไฟฟ้า
           </Typography>
         </Box>
         <Box>
           <Button
             style={{ float: "right" ,backgroundColor:"#f4adfd"}}
             component={RouterLink}
             to="/meterrecord/create"
             variant="contained"
             color="default"
             className={classes.font}
           >
             สร้างบันทึกค่าน้ำค่าไฟ
           </Button>
         </Box>
         
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell align="center" width="10%" className={classes.font}>ID</TableCell>
               <TableCell align="center" width="20%" className={classes.font}> ชื่อผู้บันทึก</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>ห้องพัก</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>หน่วยไฟฟ้าที่ใช้</TableCell>
               <TableCell align="center" width="10%" className={classes.font}>หน่วยไฟฟ้าต่อบาท</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>หน่วยน้ำที่ใช้</TableCell>
               <TableCell align="center" width="10%" className={classes.font}>หน่วยน้ำต่อบาท</TableCell>   
               <TableCell align="center" width="10%" className={classes.font}>รวมค่าน้ำค่าไฟฟ้า</TableCell>  
            </TableRow>
           </TableHead>
           <TableBody>
             {meterrecords.map((meterrecord: MeterRecordInterface) => (
               <TableRow key={meterrecord.ID}>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.ID}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.DormAtten.FirstName}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.RoomAllocate.Number}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.Uele}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.Unitprice.Uperbath}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.Uwat}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.Unitprice.Uperbath}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{meterrecord.Sum}</TableCell>
                {/* <TableCell align="center">{moment(user.BirthDay).format("DD/MM/YYYY")}</TableCell>*/}
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </Container>
   </div>
 );
}
 
export default MeterRecord;