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
import { DormTenantInterface } from "../models/IDormTenant";
import NavbarDormTenant from "./NavbarDormTenant"; 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      minWidth: 1000,
    },
    table: {
      minWidth: 800,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function DormTenants() {
  const classes = useStyles();
  const [dormtenants, setDormTenants] = useState<DormTenantInterface[]>([]);

  const getDormTenants = async () => {
    const apiUrl = "http://localhost:8080/route/ListDormTenants";
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
        if (res.data) {
          setDormTenants(res.data);
        } else {
          console.log("else");
        }
      });
  };

  useEffect(() => {
    getDormTenants();
  }, []);

  return (
    <div>
      <NavbarDormTenant/>
      <Container className={classes.container} maxWidth="md">
        <Box display="flex">
          <Box flexGrow={1}>
            <Typography
            
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
              ข้อมูลผู้ดูแลหอพัก
            </Typography>
          </Box>

        </Box>
        <TableContainer component={Paper} className={classes.tableSpace}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" width="10%">
                  ลำดับ
                </TableCell>
                <TableCell align="center" width="30%">
                  รหัสบัตรประจำตัวประชาชน
                </TableCell>
                <TableCell align="center" width="30%">
                  ชื่อจริง
                </TableCell>
                <TableCell align="center" width="30%">
                  นามสกุล
                </TableCell>
                <TableCell align="center" width="30%">
                  เพศ
                </TableCell>
                <TableCell align="center" width="30%">
                  อายุ
                </TableCell>
                <TableCell align="center" width="30%">
                  Email
                </TableCell>
                <TableCell align="center" width="30%">
                  หมายเลขโทรศัพท์
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dormtenants.map((dormtenant: DormTenantInterface) => (
                <TableRow key={dormtenant.ID}>
                  <TableCell align="center">{dormtenant.ID}</TableCell>
                  <TableCell align="center">{dormtenant.Pid}</TableCell>
                  <TableCell align="center">{dormtenant.DormTenant_FirstName}</TableCell>
                  <TableCell align="center">{dormtenant.DormTenant_LastName}</TableCell>
                  <TableCell align="center">{dormtenant.Gender}</TableCell>
                  <TableCell align="center">{dormtenant.Age}</TableCell>
                  <TableCell align="center">{dormtenant.Email}</TableCell>
                  <TableCell align="center">{dormtenant.Tel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default DormTenants;