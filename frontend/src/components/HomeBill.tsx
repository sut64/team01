import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavbarBill from "./NavbarBill";
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

function HomeBill() {
  const classes = useStyles();

  return (
    <div>
      <NavbarBill/>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบการบันทึกการชำระเงิน</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;ระบบบันทึกการชำระเงิน ภายในหอพัก เป็นระบบที่ผู้ดูแลหอพัก กรอกเลขที่ใบรายการต่างๆที่มีจำนวนเงินที่ต้องการชำระ และเลือกช่องทางการชำระเงิน จากนั้นดึงข้อมูลราคาต่างๆ เพื่อให้ผู้ดูแลหอพักได้ดำเนินการบันทึกการชำระเงินต่อไป โดยเมื่อทำการบันทึกการชำระเงินนั้นเสร็จ ก็จะได้ใบบันทึกการชำระเงิน
        นอกจากความสามารถเหล่านี้แล้ว สามารถตรวจสอบข้อมูลใบบันทึกการชำระเงิน ได้อีกด้วย
        </p>
        <img src="/img/PaymentSystem_Home.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomeBill;