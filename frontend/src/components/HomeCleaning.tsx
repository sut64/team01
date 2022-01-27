import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบแจ้งทำความสะอาดห้องพัก</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp; นี่คือระบบแจ้งทำความสะอาดห้องพัก version 1
        </p>
        <img src="/img/111.jpg" width="900px"></img>
      </Container>
    </div>
  );
}
export default HomeCleaning;