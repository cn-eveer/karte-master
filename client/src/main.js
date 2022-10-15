import './main.scss';
import image from './logo192.png';
import { Link } from 'react-router-dom';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

export default function Main() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const data_sample = [
    {
      id: 1,
      date: '02-27-2020',
    },
    {
      id: 2,
      date: '02-20-2020',
    },
    {
      id: 3,
      date: '02-13-2020',
    },
    {
      id: 4,
      date: '02-6-2020',
    },
    {
      id: 5,
      date: '01-31-2020',
    },
  ];

  return (
    <>
      <div className="Main">
        <AppBar position="absolute">
          <Toolbar variant="dense">
            <Link to="/home">
              <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography variant="h7" color="inherit" component="div">
              患者管理画面
            </Typography>
          </Toolbar>
        </AppBar>
        <Box style={{ marginTop: 80 }}>
          <Grid container spacing={2}>
            <Grid xs={3}>
              <div className="search">
                <input type="text" />
                <button>Search</button>
              </div>
              <div className="profile">
                <div className="profile__button">
                  <button>カルテを作成</button>
                </div>
                <div className="profile__name">
                  <div className="profile__name__read">ヤマダ　タロウ</div>
                  <div className="profile__name__proper">
                    <h2>山田　太郎</h2>
                  </div>
                </div>
                <div className="profile__avatar">
                  <img src={image} alt="avatar_image" />
                </div>
                <div className="profile__info">
                  <button>プロフ作成</button>
                  <div className="profile__info__title">
                    <h3>基本情報</h3>
                  </div>
                  <div className="profile__info__details">
                    <div className="profile__info__details__gender">性別:男</div>
                    <div className="profile__info__details__age">年齢:22歳</div>
                    <div className="profile__info__details__age">生年月日:2000年1月2日</div>
                  </div>
                </div>
              </div>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid container xs={8}>
              <Grid xs={4}>
                <div className="details">
                  <div className="carte_list">
                    <h3>カルテ一覧</h3>
                    <List>
                      {data_sample.map((item, index) => {
                        return (
                          <ListItemButton
                            selected={selectedIndex === index}
                            onClick={(event) => handleListItemClick(event, index)}
                          >
                            <ListItemText primary={item.date} />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </div>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid xs>
                <div className="carte__info">
                  {selectedIndex !== null ? (
                    <>
                      <h3>カルテ詳細</h3>
                      <div className="carte__info__title">
                        <h2>
                          ID: {data_sample[selectedIndex].id} {data_sample[selectedIndex].date}
                        </h2>
                      </div>
                      <div className="carte__info__body">
                        <div className="carte__info__body__info">S: 頭痛い</div>
                        <div className="Main__details__cartes__info__body__info">
                          O:
                          <div className="Main__details__cartes__info__body__info_sub">O:</div>
                          <div className="Main__details__cartes__info__body__info_sub">P:</div>
                          <div className="Main__details__cartes__info__body__info_sub">Q:</div>
                          <div className="Main__details__cartes__info__body__info_sub">R:</div>
                        </div>
                        <div className="carte__info__body__info">A: OO</div>
                        <div className="carte__info__body__info">P: XX</div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}
