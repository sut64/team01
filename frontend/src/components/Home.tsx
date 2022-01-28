import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";
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

function Home() {
  const classes = useStyles();

  return (
    <div>
      <Navbar />
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบหอพัก</h1>
        <h4>Who we are</h4>
        <p>
        &emsp;&emsp;&emsp;หากต้องการจัดการกับหอพักของคุณ ระบบหอพักนี้สามารถช่วยให้คุณบริหารการทำงานหอพักได้สะดวกสบายมากขึ้นในหลายๆด้านเนื่องจากระบบหอพักมีระบบย่อยอีกหลายระบบที่จะมาช่วยให้หอพักของคุณเป็นระบบและง่ายต่อการจัดการมากขึ้น เริ่มต้นใช้ระบบย่อยต่างๆได้ที่ logo sut se64 team01 ด้านซ้ายบนได้เลย
        </p>
        <img src="/img/dorm_system.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default Home;