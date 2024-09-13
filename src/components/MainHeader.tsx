import * as React from 'react';
import {
    AppBar,
    Box,
    Button,
    IconButton,
    Stack,
    Toolbar,
    Typography
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import log from '../logging/logger';
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { pluraliseWithCount } from "../strings";


export function MainHeader() {

    const [posts, setPosts] = useAtom(postsAtom);
    const [post, setPost] = useAtom<PostData>(editablePostAtom);

    function createNewPost() {
        const newPost: PostData = {deletable: false,
            creationDate: new Date().toISOString(),
            firstName: '', lastName: '', body: ''};
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
                    <IconButton size="large"
                                edge="start"
                                color="secondary"
                                aria-label="menu"
                                sx={{mr: 2}}>
                        <ChatIcon/>
                    </IconButton>
                    <Typography variant="h3" align="center" color="secondary" component="div" sx={{flexGrow: 1}}>
                        React Poster DEMO
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        {posts.length > 0 ?
                            <Button startIcon={<ClearIcon/>} variant="contained" color="primary" onClick={clearPosts}>
                                Clear {pluraliseWithCount(posts.length, "Post")}
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
