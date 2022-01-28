import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarRoomAllocate from "./NavbarRoomAllocate";
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

function HomeRoomAllocate() {
  const classes = useStyles();

  return (
    <div>
       <NavbarRoomAllocate/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบจัดสรรห้องพัก</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;ระบบจัดสรรห้องพักเป็นระบบหนึ่งในระบบหอพักที่ช่วยอำนวยความสะดวกของผู้ดูแลหอพัก ในเรื่องการเลือกหรือดูห้องว่างให้ผู้ที่ต้องการเช่าหอพัก โดยหากมีผู้ที่ต้องการเช่าหอพักจะเข้ามาเช่า จะทำการสอบถามว่าต้องการอยู่ห้องประเภทไหนโดยจะมีประเภทห้องให้เลือก และอยู่ชั้นไหน ห้องหมายเลขไหน และผู้ดูแลหอพักจะทำการบันทึกเข้าระบบให้ 
        </p>
        {<img src="/img/roomallocate.jpg" width="900px"></img>}
      </Container>
    </div>
  );
}
export default HomeRoomAllocate;