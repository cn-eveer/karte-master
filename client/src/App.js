import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

function App() {
  const [create, setCreate] = React.useState(false);
  const [userValue, setUserValue] = React.useState({
    name: '',
    furigana: '',
    sex: '',
    birthdate: '',
  });

  const handleChange = (prop) => (event) => {
    setUserValue({ ...userValue, [prop]: event.target.value });
  };

  const onSubmit = () => postUser();

  const postUser = () => {
    Axios.post('http://localhost:3001/user', {
      ...userValue,
    })
      .then((res) => {})
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <AppBar position="absolute">
        <Toolbar variant="dense">
          <Link to="/">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h7" color="inherit" component="div">
            管理画面
          </Typography>
        </Toolbar>
      </AppBar>
      <Box style={{ marginTop: 80, paddingTop: 70 }}>
        <Grid container direction="column" spacing={20}>
          <Grid>
            {!create ? (
              <Button variant="outlined" size="large" onClick={() => setCreate(true)}>
                患者初期登録
              </Button>
            ) : (
              <>
                <Button variant="outlined" color="primary" type="submit" onClick={onSubmit}>
                  作成する
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  type="submit"
                  onClick={() => setCreate(false)}
                >
                  キャンセル
                </Button>
                {Object.keys(userValue).map((key) => {
                  return (
                    <FormControl
                      key={key}
                      fullWidth
                      sx={{ m: 1 }}
                      variant="standard"
                      style={{ marginBottom: 15, padding: 10 }}
                    >
                      <InputLabel>{key}</InputLabel>
                      <Input value={userValue[key]} onChange={handleChange(key)} />
                    </FormControl>
                  );
                })}
              </>
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
