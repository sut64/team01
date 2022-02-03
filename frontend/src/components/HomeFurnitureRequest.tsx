import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarFurnitureRequest from "./NavbarFurnitureRequest";
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

function HomeFurnitureRequest() {
  const classes = useStyles();

  return (
    <div>
      <NavbarFurnitureRequest/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบยืมครุภัณฑ์</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;ระบบยืมครุภัณฑ์เป็นระบบที่ให้ผู้ดูแลหอพักสามารถลงทะเบียนยืมครุภัณฑ์(อาทิ โต๊ะเขียนหนังสือ เตียง ตู้เย็น ฯลฯ)ในระบบ โดยมีการแจ้งรายการครุภัณฑ์และจำนวนที่ยืม วันเวลาที่ยืม ห้องพักและผู้เข้าพักที่ทำการยืมครุภัณฑ์นั้นไป เมื่อกดบันทึก ระบบจะทำการข้อมูลบันทึกเข้าไปไว้ในบันทึกการยืมครุภัณฑ์เข้าไปในฐานข้อมูลของระบบยืมครุภัณฑ์ เพื่อเป็นหลักฐานในการยืมครุภัณฑ์แก่ผู้ดูแลหอพัก
        </p>

      </Container>
    </div>
  );
}
export default HomeFurnitureRequest;