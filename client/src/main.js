import './main.scss';
import image from './logo192.png';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
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
  const [selectDisease, setSelectDisease] = React.useState(false);
  const [selectCreate, setSelectCreate] = React.useState(false);
  const [searchId, setSearchId] = React.useState('');

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const [userValues, setUserValues] = React.useState({
    user_id: 0,
    name: '',
    furigana: '',
    sex: '',
    age: '',
    birthdate: '',
  });

  const [formValues, setFormValues] = React.useState({
    Subjective: '',
    Objective: '',
    Assessment: '',
    Plan: '',
  });

  const [objectiveData, setObjectiveData] = React.useState({});

  const [template, setTemplate] = React.useState([]);

  const handleChange = (prop) => (event) => {
    console.log(prop);
    setFormValues({ ...formValues, [prop]: event.target.value });
    console.log(formValues[prop]);
  };

  const createObjective = (data) => {
    console.log(data);
    setSelectDisease(true);
    setObjectiveData(data.item);
  };
  const createCarte = () => {
    setSelectCreate(true);
    Axios.get('http://localhost:3001/templates').then((res) => {
      setTemplate(res.data);
    });
  };

  const onSubmit = () => postCarte();

  const getCartes = () => {
    console.log('CLICKED');
    Axios.get('http://localhost:3001/cartes', { params: { user_id: searchId } })
      .then((res) => {
        setCartesData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCarte = () => {
    Axios.post('http://localhost:3001/carte', {
      user_id: userValues.user_id,
      ...formValues,
    })
      .then()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSelectCreate(false);
        getUser();
        setFormValues({
          Subjective: '',
          Objective: '',
          Assessment: '',
          Plan: '',
        });
      });
  };

  const postUser = () => {
    Axios.post('http://localhost:3001/user', {
      name: '山田　太郎',
      furigana: 'ヤマダ　タロウ',
      sex: '男',
      birthdate: '2000-01-02',
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const getUser = () => {
    Axios.get('http://localhost:3001/user', {
      params: { user_id: searchId },
    })
      .then((res) => {
        setUserValues(res.data);
        setSelectCreate(false);

        Axios.get('http://localhost:3001/cartes', { params: { user_id: searchId } })
          .then((res) => {
            setCartesData(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTemplates = () => {
    Axios.get('http://localhost:3001/templates').then((res) => {
      console.log(res);
    });
  };

  const formatData = () => {
    return userValues.birthdate.split('T')[0];
  };

  const [cartesData, setCartesData] = React.useState([{}]);

  return (
    <>
      <div className="Main" style={{ padding: 10 }}>
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
          <Grid container spacing={2} style={{ height: '100%' }}>
            <Grid xs={3}>
              <div className="search" style={{ padding: 10 }}>
                <Input
                  values={searchId}
                  onChange={(event) => setSearchId(event.target.value)}
                  variant="filled"
                />
                <Button variant="outlined" onClick={getUser} style={{ marginLeft: 15 }}>
                  患者検索
                </Button>
              </div>
              <div className="profile" style={{ paddingTop: 15, minHeight: '70%' }}>
                <div className="profile__name">
                  <div className="profile__name__read">{userValues.furigana}</div>
                  <div className="profile__name__proper">
                    <h2>{userValues.name}</h2>
                  </div>
                </div>
                <div className="profile__avatar">
                  <img src={image} alt="avatar_image" />
                </div>
                <div className="profile__info">
                  <div className="profile__info__title">
                    <h3>基本情報</h3>
                  </div>
                  <div className="profile__info__details" style={{ padding: 15 }}>
                    <div className="profile__info__details__gender">性別:{userValues.sex}</div>
                    <div className="profile__info__details__age">年齢: {userValues.age} 歳</div>
                    <div className="profile__info__details__age">生年月日:{formatData()}</div>
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
                      {userValues.user_id !== 0 && (
                        <Button variant="outlined" onClick={createCarte}>
                          カルテ作成
                        </Button>
                      )}
                      <List style={{ marginTop: 20, maxHeight: 700, overflow: 'auto' }}>
                        {cartesData.map((item, index) => {
                          return (
                            <ListItemButton
                              key={index}
                              selected={selectedIndex === index}
                              onClick={(event) => handleListItemClick(event, index)}
                              style={{ border: '0.1px solid', marginBottom: 5 }}
                            >
                              <ListItemText primary={item.carte_id} />
                            </ListItemButton>
                          );
                        })}
                      </List>
                      <Divider style={{ padding: 10 }} />
                    </div>
                  </div>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid xs>
                  <Box className="carte__info">
                    {selectedIndex !== null ? (
                      <>
                        <h3>カルテ詳細</h3>
                        <div className="carte__info__title">
                          <h2>
                            ID: {cartesData[selectedIndex].carte_id}
                            {cartesData[selectedIndex].date}
                          </h2>
                        </div>
                        <Typography className="carte__info__body">
                          {['subjective', 'objective', 'assessment', 'plan'].map((key) => {
                            return (
                              <Box style={{ padding: 25, textAlign: 'left' }}>
                                <h4>{key}</h4>
                                <div>{cartesData[selectedIndex][key]}</div>
                              </Box>
                            );
                          })}
                        </Typography>
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                </Grid>
              </Grid>
            ) : (
              <Grid xs>
                <Container>
                  <Grid container>
                    <Button color="secondary" type="submit" onClick={() => setSelectCreate(false)}>
                      キャンセル
                    </Button>
                    <Grid xs>
                      <div>
                        <h3>カルテ作成</h3>
                      </div>
                    </Grid>
                    <Button variant="outlined" color="primary" type="submit" onClick={onSubmit}>
                      作成する
                    </Button>
                  </Grid>
                  {Object.keys(formValues).map((key) => {
                    return key !== 'Objective' ? (
                      <FormControl
                        key={key}
                        fullWidth
                        sx={{ m: 1 }}
                        variant="standard"
                        style={{ marginBottom: 15, padding: 10 }}
                      >
                        <InputLabel>{key}</InputLabel>
                        <Input
                          multiline
                          minRows={5}
                          value={formValues[key]}
                          onChange={handleChange(key)}
                          startAdornment={
                            <InputAdornment position="start">{key[0]}</InputAdornment>
                          }
                        />
                      </FormControl>
                    ) : (
                      <div style={{ border: '1px solid', marginBottom: 35, padding: 45 }}>
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid container alignItems="center">
                            <Grid>Objective</Grid>

                            {!selectDisease ? (
                              template.map((item) => {
                                return (
                                  <Grid xs>
                                    <Button
                                      variant="outlined"
                                      onClick={() => createObjective(item)}
                                    >
                                      {item.disease_name}
                                    </Button>
                                  </Grid>
                                );
                              })
                            ) : (
                              <>
                                <Button
                                  color="secondary"
                                  type="submit"
                                  onClick={() => setSelectDisease(false)}
                                >
                                  キャンセル
                                </Button>
                                {Object.keys(objectiveData).map((key) => {
                                  return (
                                    <FormControl
                                      key={key}
                                      fullWidth
                                      sx={{ m: 1 }}
                                      variant="standard"
                                    >
                                      <InputLabel>{key}</InputLabel>
                                      <Input value={formValues[key]} onChange={handleChange(key)} />
                                    </FormControl>
                                  );
                                })}
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
                  {console.log(template.map((item) => item.disease_name))}
                </Container>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
}
