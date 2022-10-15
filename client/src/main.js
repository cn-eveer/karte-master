import './main.scss';
import image from './logo192.png';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

export default function Main() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selectCreate, setSelectCreate] = React.useState(false);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [formValues, setFormValues] = React.useState({
    Subjective: '',
    Objective: '',
    Assessment: '',
    Plan: '',
  });

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const onSubmit = () => {
    console.log(formValues);
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
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSelectCreate(true);
                    }}
                  >
                    カルテ作成
                  </Button>
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

            {!selectCreate ? (
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
            ) : (
              <Grid xs>
                <Grid container>
                  <Grid xs>
                    <div>
                      <h3>カルテ作成</h3>
                    </div>
                  </Grid>
                  <Button
                    position="float"
                    variant="outlined"
                    color="primary"
                    type="submit"
                    onClick={onSubmit}
                  >
                    Submit
                  </Button>
                </Grid>
                {Object.keys(formValues).map((key) => {
                  return (
                    <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                      <InputLabel>{key}</InputLabel>
                      <Input
                        value={formValues[key]}
                        onChange={handleChange(key)}
                        startAdornment={<InputAdornment position="start">{key[0]}</InputAdornment>}
                      />
                    </FormControl>
                  );
                })}
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
}
