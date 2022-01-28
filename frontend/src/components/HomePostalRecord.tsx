import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarPostalRecs from "./NavbarPostalRecs";
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

function HomePostalRecord() {
  const classes = useStyles();

  return (
    <div>
      <NavbarPostalRecs/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบบันทึกรายการพัสดุ</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;ระบบบันทึกรายการพัสดุเป็นระบบที่ช่วยให้ผู้ดูแลหอพักบันทึกข้อมูลพัสดุที่รับมาจากผู้ส่งพัสดุ โดยข้อมูลที่บันทึกนั้นจะเป็นข้อมูลพัสดุของผู้เช่าหอพัก ทั้งชื่อ-สกุล หมายเลขห้องของผู้เช่าหอพัก และข้อมูลประเภทพัสดุ เพื่อที่จะสามารถตรวจสอบพัสดุต่างๆที่รอการรับจากผู้เช่าหอพักได้สะดวกสบายมากขึ้น
        </p>
        <img src="/img/postal_record.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomePostalRecord;