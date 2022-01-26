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

function HomeRoomAllocate() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.container} maxWidth="md">
        <h1 style={{ textAlign: "center" }}>ระบบ...</h1>
        <h4>Requirements</h4>
        <p>
        &emsp;&emsp;&emsp;
        </p>
        {/*<img src="/img/postal_record.jpg" width="900px"></img>*/}
      </Container>
    </div>
  );
}
export default HomeRoomAllocate;