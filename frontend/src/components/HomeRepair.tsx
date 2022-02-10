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
        &emsp;&emsp;&emsp;ระบบแจ้งซ่อมของหอพัก เป็นระบบที่ให้ผู้เช่าหอพักแจ้งซ่อมครุภัณฑ์หรือสิ่งของต่าง ๆ ภายในห้องพักของตนที่ชำรุด โดยผู้เช่าพักกรอกชื่อผู้เช่าและหมายเลขห้องพักเพื่อให้สามารถเข้าไป
        ซ่อมแซมได้ถูกต้อง ทั้งยังสามารถเลือกเวลานัดหมายในการซ่อมแซม โดยครุภัณฑ์ที่สามารถซ่อมแซมได้ต้องมีอยู่ในห้องพักอยู่แล้ว 
        
        การแจ้งซ่อมมีสองประเภท การแจ้งซ่อมด่วนและการแจ้งซ่อมปกติ การแจ้งซ่อมด่วนจะใช้เวลาในการดำเนินการ 1-3 วันตามดุลยพินิจของผู่ดูแลหอพัก การแจ้งซ่อมปกติจะใช้เวลาอย่างน้อย 7 วัน เมื่อใกล้ถึงวันนัดหมายผู้ดูแลหอพักจะโทรไปแจ้งรายละเอียดอีกครั้ง 
        </p>
        <img src="/img/Homerepair.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomeRepair;