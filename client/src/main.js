import './main.scss';
import * as React from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Divider from '@mui/material/Divider';

import Typography from '@mui/material/Typography';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';

import AppBarComp from './appbar';
import Profile from './profile';
export default function Main() {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [selectDisease, setSelectDisease] = React.useState(false);
  const [selectCreate, setSelectCreate] = React.useState(false);
  const [searchId, setSearchId] = React.useState('');

  const [objectiveSub, setObjectiveSub] = React.useState({});
  const [objectiveSubDisplay, setObjectiveSubDisplay] = React.useState({});

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
    Objective: {},
    Assessment: '',
    Plan: '',
  });

  const [objectiveData, setObjectiveData] = React.useState({});
  const [disease, setDisease] = React.useState('');
  const [template, setTemplate] = React.useState([]);

  const handleChange = (prop) => (event) => {
    setFormValues({ ...formValues, [prop]: event.target.value });
  };

  const handleChangeObejective = (prop) => (event) => {
    setObjectiveSub({ ...objectiveSub, [prop]: event.target.value });
  };

  const createObjective = (data) => {
    setSelectDisease(true);
    setObjectiveData(data.item);
    setDisease(data.disease_name);
  };
  const createCarte = () => {
    setSelectCreate(true);
    Axios.get('http://localhost:3001/templates').then((res) => {
      setTemplate(res.data);
    });
  };

  const onSubmit = () => postCarte();

  const getCartes = () => {
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
      Subjective: formValues.Subjective,
      Objective: objectiveSub,
      Assessment: formValues.Assessment,
      Plan: formValues.Plan,
    })
      .then()
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSelectCreate(false);
        setSelectDisease(false);
        getUser();
        setFormValues({
          Subjective: '',
          Objective: '',
          Assessment: '',
          Plan: '',
        });
        setObjectiveSub({});
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

  const formatData = (data) => {
    return data !== undefined ? data.split('T')[0] : '-';
  };

  const formatJson = (data) => {
    setObjectiveSubDisplay(JSON.parse(data));
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const [cartesData, setCartesData] = React.useState([{}]);

  const order = ['バイタルサイン', '問診', '身体診察'];
  const vital = ['体温', '血圧', '脈拍', '呼吸数'];
  const monshin = [
    'Onset:「いつから痛みは始まりしたか」',
    'Palliative&Provoke:「どんな時に良く/悪くなりますか。」',
    'Quality&Quantity:「どのような/どれくらいの痛みですか」',
    'Region:「どこが痛いのか,指差してください',
    'Symptoms:「他にどんな症状がありますか」',
    'Time course:「最初はどのように始まり、どのような経過で、今はどうですか。」',
  ];

  return (
    <>
      <AppBarComp />
      <div className="Main" style={{ padding: 10 }}>
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
              <Profile values={userValues} />
            </Grid>
            <Divider orientation="vertical" flexItem />

            {!selectCreate ? (
              <Grid container xs={8}>
                <Grid xs={4}>
                  <div className="details">
                    <div className="carte_list">
                      <h3>カルテ一覧</h3>
                      {userValues.user_id !== 0 && (
                        <Button variant="outlined" onClick={() => createCarte()}>
                          カルテ作成
                        </Button>
                      )}
                      <List style={{ marginTop: 20, maxHeight: 700, overflow: 'auto' }}>
                        {cartesData.map((item, index) => {
                          return (
                            <ListItemButton
                              key={index}
                              selected={selectedIndex === index}
                              onClick={(event) => {
                                handleListItemClick(event, index);
                                formatJson(cartesData[index].objective);
                              }}
                              style={{ border: '0.1px solid', marginBottom: 5 }}
                            >
                              <ListItemText primary={formatData(item.date)} />
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
                          <h2>{formatData(cartesData[selectedIndex].date)}</h2>
                          <h3> ID: {cartesData[selectedIndex].carte_id}</h3>
                        </div>
                        <Typography className="carte__info__body">
                          {['subjective', 'objective', 'assessment', 'plan'].map((key) => {
                            return (
                              <Box style={{ padding: 25, textAlign: 'left' }}>
                                <h4>{key}</h4>
                                {key === 'objective' ? (
                                  <>
                                    {Object.keys(objectiveSubDisplay).map((keyO) => {
                                      return (
                                        <div>
                                          {keyO} : {objectiveSubDisplay[keyO]}
                                        </div>
                                      );
                                    })}
                                  </>
                                ) : (
                                  <div>{cartesData[selectedIndex][key]}</div>
                                )}
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
                {/* カルテの作成 */}
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
                        {/* Objectives 以外の表示 */}
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
                        {/* Objectives 表示 */}
                        <Grid
                          container
                          direction="row"
                          justifyContent="flex-start"
                          alignItems="center"
                        >
                          <Grid container alignItems="center" direction="columns">
                            <Grid>Objective</Grid>
                            {/* Objectives 項目を表示 */}
                            {console.log(objectiveData)}

                            {!selectDisease ? (
                              template.map((item, index) => {
                                return (
                                  <Grid xs key={`${item.disease_name}-${index}`}>
                                    {/* disease の選択*/}
                                    <Button
                                      variant="outlined"
                                      onClick={() => {
                                        createObjective(item);
                                      }}
                                    >
                                      {item.disease_name}
                                    </Button>
                                  </Grid>
                                );
                              })
                            ) : (
                              <>
                                <Grid>
                                  <Button
                                    color="secondary"
                                    type="submit"
                                    onClick={() => setSelectDisease(false)}
                                  >
                                    キャンセル
                                  </Button>
                                </Grid>
                                <Grid>
                                  {/* Objectives 項目をINPUT 表示 */}
                                  <Grid container>
                                    {disease === '頭痛' &&
                                      order.map((field, index) => {
                                        return (
                                          <Grid container>
                                            <Grid>
                                              <h4>{field}</h4>
                                            </Grid>
                                            {field !== '問診' && field !== 'バイタルサイン' && (
                                              <>
                                                {Object.keys(objectiveData[field]).map(
                                                  (subfield) => {
                                                    return (
                                                      <FormControl
                                                        key={subfield}
                                                        fullWidth
                                                        sx={{ m: 1 }}
                                                        variant="standard"
                                                        style={{ marginBottom: 15, padding: 10 }}
                                                      >
                                                        {/* Objectives 以外の表示 */}
                                                        <InputLabel>{subfield}</InputLabel>
                                                        <Input
                                                          value={objectiveSub[subfield]}
                                                          onChange={handleChangeObejective(
                                                            subfield,
                                                          )}
                                                        />
                                                      </FormControl>
                                                    );
                                                  },
                                                )}
                                              </>
                                            )}
                                            {field === '問診' && (
                                              <>
                                                {monshin.map((subfield) => {
                                                  return (
                                                    <FormControl
                                                      key={subfield}
                                                      fullWidth
                                                      sx={{ m: 1 }}
                                                      variant="standard"
                                                      style={{ marginBottom: 15, padding: 10 }}
                                                    >
                                                      {/* Objectives 以外の表示 */}
                                                      {console.log(subfield)}
                                                      <InputLabel>{subfield}</InputLabel>
                                                      <Input
                                                        value={objectiveSub[subfield]}
                                                        onChange={handleChangeObejective(subfield)}
                                                      />
                                                    </FormControl>
                                                  );
                                                })}
                                              </>
                                            )}
                                            {field === 'バイタルサイン' && (
                                              <>
                                                {vital.map((subfield) => {
                                                  return (
                                                    <FormControl
                                                      key={subfield}
                                                      fullWidth
                                                      sx={{ m: 1 }}
                                                      variant="standard"
                                                      style={{ marginBottom: 15, padding: 10 }}
                                                    >
                                                      {/* Objectives 以外の表示 */}
                                                      {console.log(subfield)}
                                                      <InputLabel>{subfield}</InputLabel>
                                                      <Input
                                                        value={objectiveSub[subfield]}
                                                        onChange={handleChangeObejective(subfield)}
                                                      />
                                                    </FormControl>
                                                  );
                                                })}
                                              </>
                                            )}
                                          </Grid>
                                        );
                                      })}
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </Grid>
                        </Grid>
                      </div>
                    );
                  })}
                </Container>
              </Grid>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
}
