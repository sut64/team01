import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarCleaningRequest from "./NavberCleaningRequest";
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

function HomeCleaning() {
  const classes = useStyles();

  return (
    <div>
       <NavbarCleaningRequest/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบแจ้งทำความสะอาดห้องพัก</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp; ระบบหอพักเป็นระบบที่ช่วยจัดการสิ่งต่าง ๆ ภายในหอพักเพื่อช่วยอำนวยความสะดวกให้แก่ผู้เช่าหอพักและผู้ดูแลหอพักได้จัดการสิ่งต่าง ๆ ได้ง่ายและรวดเร็วยิ่งขึ้น และระบบย่อยที่จำเป็นต่อผู้เช่าหอพักคือ ระบบแจ้งทำความสะอาดหอพัก เป็นระบบที่ทำให้ผู้เช่าหอพักแจ้งผู้ดูแลหอพักให้มาทำความสะอาดของห้องตัวเองเวลาที่ผู้เช่าหอพักไม่ได้อยู่ในห้อง
        </p>
        <img src="/img/111.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomeCleaning;