import { AppBar, Box, Button, createTheme, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import log from '../logging/logger';
import { useSetAtom } from "jotai/index";
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { pluraliseWithCount } from "../strings";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});


export function MainHeader() {

    const setPost = useSetAtom(editablePostAtom);
    const [posts, setPosts] = useAtom(postsAtom);

    function createNewPost() {
        const newPost: PostData = {author: '', body: ''};
        setPost(newPost);
        log.info("Create Post:", newPost);
    }

    function clearPosts() {
        log.info("Clearing Posts");
        setPosts([]);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <ChatIcon/>
                    </IconButton>
                    <Typography variant="h3" align="center" color="secondary" component="div" sx={{flexGrow: 1}}>
                        React Poster DEMO
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        {posts.length > 0 ?
                            <Button startIcon={<ClearIcon/>} variant="contained" color="primary" onClick={clearPosts}>
                                Clear {pluraliseWithCount(posts.length,"Post")}
                            </Button> : null}
                        <Button startIcon={<CreateIcon/>} variant="contained" color="secondary" onClick={createNewPost}>
                            New Post
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
