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

import { CleaningrequrestInterface } from "../models/ICleaningrequrest";
 
import moment from 'moment';
import NavbarCleaningRequest from "./NavberCleaningRequest"; 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2),minWidth: 1200},
   table: { minWidth: 1100 },
   tableSpace: {marginTop: 20},
   font: {fontFamily:"kanitlight"},
   fontIn: {fontFamily:"kanitlight",color:"#566573"},
  
 })
);
 
function Cleaningrequrests() {
 const classes = useStyles();
 const [cleaningrequrests, setCleaningrequrests] = React.useState<CleaningrequrestInterface[]>([]);
 
 const getCleaningrequrests = async () => {
   const apiUrl = "http://localhost:8080/route/ListCleaningrequrest";
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
         setCleaningrequrests(res.data);
       } else {
         console.log("else");
       }
     });
 };
 
 useEffect(() => {
   getCleaningrequrests();
 }, []);
 
 return (
   <div>
     <NavbarCleaningRequest/>
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
             ประวัติแจ้งทำความสะอาด
           </Typography>
         </Box>
         <Box>
         <Button
             style={{ float: "right" ,backgroundColor:"#f4adfd"}}
             component={RouterLink}
             to="/cleaningrequrest/create"
             variant="contained"
             color="default"
             className={classes.font}
           >
             แจ้งทำความสะอาด
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
               <TableCell align="center" width="10%" className={classes.font}>
                 ห้องพัก
               </TableCell>
               <TableCell align="center" width="20%" className={classes.font}>
                 ประเภททำความสะอาด
               </TableCell>
               <TableCell align="center" width="20%" className={classes.font}>
                 ช่วงเวลาทำความสะอาด
               </TableCell>
               <TableCell align="center" width="10%" className={classes.font}>
                 วันที่ทำความสะอาด
               </TableCell>
               <TableCell align="center" width="15%" className={classes.font}>
                 เบอร์ติดต่อ
               </TableCell>
               <TableCell align="center" width="10%" className={classes.font}>
                 หมายเหตุ
             
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {cleaningrequrests.map((cleaningrequrest: CleaningrequrestInterface) => (
               <TableRow key={cleaningrequrest.ID}>

                 <TableCell align="center" className={classes.fontIn}>{cleaningrequrest.ID}</TableCell>
                 <TableCell align="center" size="medium" className={classes.fontIn}>
                   {cleaningrequrest.RoomAllocate.Number} </TableCell>
                 <TableCell align="center" className={classes.fontIn}>{cleaningrequrest.Cleaningtype.Type}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{cleaningrequrest.Timerequrest.Period}</TableCell>

                 <TableCell align="center" className={classes.fontIn}>{moment(cleaningrequrest.Day).format("DD/MM/YYYY")}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{cleaningrequrest.Tel}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{cleaningrequrest.Note}</TableCell>
     
                 

               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </Container>
   </div>
 );
}
 
export default Cleaningrequrests;