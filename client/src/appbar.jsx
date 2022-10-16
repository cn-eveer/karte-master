import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';

export default function AppBarComp() {
  return (
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
  );
}
