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
import { Postal_RecordInterface } from "../models/IPostal_Record";
 
import moment from 'moment';
import NavbarPostalRecs from "./NavbarPostalRecs";
 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2),minWidth: 1200},
   table: { minWidth: 1100 },
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight",color:"black"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
  
 })
);
 
function PostalRecords() {
 const classes = useStyles();
 const [postalrecords, setPostalrecords] = React.useState<Postal_RecordInterface[]>([]);
 
 const getPostalRecords = async () => {
   const apiUrl = "http://localhost:8080/route/ListPostalRecords";
   const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
 
   fetch(apiUrl, requestOptions)
     .then((response) => response.json())
     .then((res) => {
       console.log(res.data);
       if (res.data) {
         setPostalrecords(res.data);
       } else {
         console.log("else");
       }
     });
 };
 
 useEffect(() => {
   getPostalRecords();
 }, []);
 
 return (
   <div>
     <NavbarPostalRecs/>
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
             บันทึกรายการพัสดุ
           </Typography>
         </Box>
         <Box>
           <Button
             style={{ float: "right" ,backgroundColor:"#f4adfd"}}
             component={RouterLink}
             to="/postal_record/create"
             variant="contained"
             color="default"
             className={classes.font}
           >
             สร้างบันทึกรายการพัสดุใหม่
           </Button>
         </Box>
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell align="center" width="5%" className={classes.font}>
                 ID
               </TableCell>
               <TableCell align="center" width="20%" className={classes.font}>
                 ชื่อผู้บันทึก
               </TableCell>
               <TableCell align="center" width="15%" className={classes.font}>
                 Tracking
               </TableCell>
               <TableCell align="center" width="15%" className={classes.font}>
                 ชื่อผู้รับ
               </TableCell>
               <TableCell align="center" width="15%" className={classes.font}>
                 จัดส่งโดย
               </TableCell>
               <TableCell align="center" width="12%" className={classes.font}>
                 ลักษณะพัสดุ
               </TableCell>
               <TableCell align="center" width="3%" className={classes.font}>
                 จำนวน
               </TableCell>
               <TableCell align="center" width="15%" className={classes.font}>
                 วันที่มาส่ง
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {postalrecords.map((postalrecord: Postal_RecordInterface) => (
               <TableRow key={postalrecord.ID}>
                 <TableCell align="center" className={classes.fontIn}>{postalrecord.ID}</TableCell>
                 <TableCell align="center" size="medium" className={classes.fontIn}>
                   {postalrecord.DormAtten.FirstName} {postalrecord.DormAtten.LastName}
                 </TableCell>
                 <TableCell align="center" className={classes.fontIn}>{postalrecord.Tracking}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>
                   {postalrecord.RoomAllocate.Number} {postalrecord.RoomAllocate.DormTenant_FirstName} {postalrecord.RoomAllocate.DormTenant_LastName}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{postalrecord.Carrier.CarrierName}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{postalrecord.Postal.Type}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{postalrecord.Amount}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{moment(postalrecord.RecordTime).format("DD/MM/YYYY")}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </Container>
   </div>
 );
}
 
export default PostalRecords;