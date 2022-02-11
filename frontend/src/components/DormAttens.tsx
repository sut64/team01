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
import { DormAttenInterface } from "../models/IDormAtten";
import NavbarDormAtten from "./์NavbarDormAtten"; 
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
 
function DormAttens() {
 const classes = useStyles();
 const [dormattens, setDormAttens] = React.useState<DormAttenInterface[]>([]);
 
 const getDormAttens = async () => {
   const apiUrl = "http://localhost:8080/route/ListDormAttens";
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
         setDormAttens(res.data);
       } else {
         console.log("else");
       }
     });
 };
 
 useEffect(() => {
   getDormAttens();
 }, []);
 
 return (
   <div>
     <NavbarDormAtten/>
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
             ผู้เข้าพัก
           </Typography>
         </Box>
         
       </Box>
       <TableContainer component={Paper} className={classes.tableSpace}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell align="center" width="10%" className={classes.font}>ID</TableCell>
               <TableCell align="center" width="20%" className={classes.font}> Firstname</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>Lastname</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>Pid</TableCell>
               <TableCell align="center" width="10%" className={classes.font}>Age</TableCell>
               <TableCell align="center" width="20%" className={classes.font}>Tel</TableCell>
               <TableCell align="center" width="10%" className={classes.font}>Gender</TableCell>   
             </TableRow>
           </TableHead>
           <TableBody>
             {dormattens.map((dormatten: DormAttenInterface) => (
               <TableRow key={dormatten.ID}>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.ID}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.FirstName}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.LastName}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.Pid}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.Age}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.Tel}</TableCell>
                 <TableCell align="center" className={classes.fontIn}>{dormatten.Gender}</TableCell>
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
 
export default DormAttens;