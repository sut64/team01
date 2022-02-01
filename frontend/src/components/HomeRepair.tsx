import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarRepairRequest from "./NavbarRepairRequest";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({   
    container: {
      marginTop: theme.spacing(2),
      fontFamily:"kanitlight",
    },
    table: {
      minWidth: 650,
    },
    tableSpace: {
      marginTop: 20,
    },
  })
);

function HomeRepair() {
  const classes = useStyles();

  return (
    <div>
      <NavbarRepairRequest/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบแจ้งซ่อม</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;ระบบแจ้งซ่อม ภายในหอพัก เป็นระบบที่ผู้เช่า แจ้งซ่อมแซมสิ่งของเพื่อให้ผู้ดูแลหอพักดำเนินการซ่อมแซมให้ตามเวลาที่บันทึก
        </p>
        <img src="/img/Homerepair.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomeRepair;