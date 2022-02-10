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
import { FurnitureRequestInterface } from "../models/IFurnitureRequest";
import NavbarFurnitureRequest from "./NavbarFurnitureRequest";
 
import moment from 'moment';
 
 
const useStyles = makeStyles((theme: Theme) =>
 createStyles({
   container: {marginTop: theme.spacing(2)},
   table: { minWidth: 650},
   tableSpace: {marginTop: 20},
 })
);
 
function FurnitureRequest() {
 const classes = useStyles();
 const [FurnitureRequest, setFurnitureRequest] = React.useState<FurnitureRequestInterface[]>([]);
 const apiUrl = "http://localhost:8080";
 const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
};

 const getFurnitureRequests = async () => {
    fetch(`${apiUrl}/route/ListFurnitureRequest`, requestOptions)   
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setFurnitureRequest(res.data);
        } else {
          console.log("else");
        }
      });
  };
 
 useEffect(() => {
  getFurnitureRequests();
 }, []);
 
 return (
   <div>
     <NavbarFurnitureRequest/>
     <Container className={classes.container} maxWidth="md">
       <Box display="flex">
         <Box flexGrow={1}>
           <Typography
             component="h2"
             variant="h6"
             color="primary"
             gutterBottom
           >
             บันทึกการยืมครุภัณฑ์
           </Typography>
         </Box>
         <Box>
           <Button
             component={RouterLink}
             to="/furniturerequest/create"
             variant="contained"
             color="primary"
           >
             Create FurnitureRequest
           </Button>
         </Box>
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell align="center" width="5%">
                 ID
               </TableCell>
               <TableCell align="center" width="25%">
                 ผู้บันทึก
               </TableCell>
               <TableCell align="center" width="20%">
                 ครุภัณฑ์ที่ต้องการยืม
               </TableCell>
               <TableCell align="center" width="5%">
                 จำนวน
               </TableCell>
               <TableCell align="center" width="25%">
                 ผู้ยืม
               </TableCell>
               <TableCell align="center" width="20%">
                 เบอร์โทรศัพท์
               </TableCell>
               <TableCell align="center" width="20%">
                 วันที่ทำการยืม
               </TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             {FurnitureRequest.map((furniturerequest: FurnitureRequestInterface) => (
               <TableRow key={furniturerequest.ID}>
                 <TableCell align="right">{furniturerequest.ID}</TableCell>
                 <TableCell align="left" size="medium">{furniturerequest.DormAtten.FirstName} {furniturerequest.DormAtten.LastName}</TableCell>
                 <TableCell align="left">{furniturerequest.DormInventory.FurnitureName}</TableCell>
                 <TableCell align="left">{furniturerequest.FurAmount}</TableCell>
                 <TableCell align="left">{furniturerequest.RoomAllocate.DormTenant_FirstName} {furniturerequest.RoomAllocate.DormTenant_LastName}</TableCell>
                 <TableCell align="left">{furniturerequest.PhoneNo}</TableCell>
                 <TableCell align="center">{moment(furniturerequest.DateRequest).format("DD/MM/YYYY")}</TableCell>
               </TableRow>
             ))}
           </TableBody>
         </Table>
       </TableContainer>
     </Container>
   </div>
 );
}
 
export default FurnitureRequest;
