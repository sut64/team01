import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Navbar from "./Navbar";
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from '@mui/material/Link';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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
     
      <Grid container spacing={3}>
        <h4>รูปภาพเพิ่มเติม :</h4>
      <Box sx={{ width: 900, height: 1400 }}>
      <ImageList variant="masonry" cols={3} gap={50}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
      .
      <h4>ติดตามเราได้ที่ :</h4>
      <Grid container spacing={3}>
      <Grid item xs={12}> 
      <Link href={`https://www.facebook.com/Sut-Se64-Team01-105245478685108`}>
      <Button style={{float: "left" }} variant="contained" startIcon={<FacebookIcon />} >
      Facebook Page Sut-Se64-Team01</Button></Link>
      </Grid>
      <Grid item xs={12}>
      <Link href={`https://www.youtube.com/channel/UCkzxtB4OUClcUWlxtgDA4uA`}>
      <Button style={{float: "left" ,backgroundColor:"red"}} variant="contained" startIcon={<YouTubeIcon />} >
      Youtube Channal Sut-Se64-Team01</Button></Link>
      </Grid>
      </Grid>
      </Grid>
      </Container>
    </div>
  );
}
export default Home;
const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
    title: 'Bed',
  },
  {
    img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
    title: 'Books',
  },
  {
    img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
    title: 'Sink',
  },
  {
    img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
    title: 'Kitchen',
  },
  {
    img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    title: 'Blinds',
  },
  {
    img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
    title: 'Chairs',
  },
  {
    img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
    title: 'Laptop',
  },
  {
    img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
    title: 'Doors',
  },
  {
    img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
    title: 'Storage',
  },
  {
    img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
    title: 'Candle',
  },
  {
    img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    title: 'Coffee table',
  },
];
