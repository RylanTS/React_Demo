import { MdPostAdd, MdMessage } from 'react-icons/md';
import {Button, Typography, AppBar, Box, Toolbar, IconButton, ThemeProvider, createTheme} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

    function MainHeader({ onCreatePost }) {
    return (
      <Box sx ={{ flexGrow: 1 }}>
        <AppBar position="static" color="inherit" >
          <Toolbar>
          <IconButton
           size="large"
           edge="start"
           color="secondary"
           aria-label="menu"
           sx={{ mr: 2 }}
           >
            <ChatIcon />
           </IconButton>
            <Typography variant="h3" align="center" color="secondary" component="div" sx={{ flexGrow: 1}}>
              React Poster DEMO
            </Typography>
                <Button variant="contained" color="secondary" onClick={onCreatePost}> 
                  New Post
                </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }

export default MainHeader;
