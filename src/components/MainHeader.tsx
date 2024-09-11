import * as React from 'react';
import {AppBar, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, IconButton, Stack, TextField, Toolbar, Typography} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import log from '../logging/logger';
import {PostData} from "../interfaces";
import {editablePostAtom, postsAtom} from "../atoms/atoms";
import {useAtom} from "jotai";
import {pluraliseWithCount} from "../strings";


export function MainHeader() {

    const [posts, setPosts] = useAtom(postsAtom);
    const [post, setPost] = useAtom<PostData>(editablePostAtom);
    const disabled = !post?.body || !post?.author;
    const open = !!post;

    function createNewPost() {
        const newPost: PostData = {deletable: false, creationDate: new Date().toISOString(), author: '', body: ''};
        setPost(newPost);
        log.info("Create Post:", newPost);
    }

    function clearPosts() {
        log.info("Clearing Posts");
        setPosts([]);
    }


    function handleClose() {
        setPost(null);
    }

    function postChangeHandler(event) {
        const fieldName = event.target.id;
        const fieldValue = event.target.value;
        log.info("changing post fieldName:", fieldName, "fieldValue:", fieldValue);
        setPost(existingPost => ({...existingPost, [fieldName]: fieldValue}));
    }

    function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        const fieldName = event.target.id;
        const fieldValue = event.target.checked;
        log.info("changing post fieldName:", fieldName, "fieldValue:", fieldValue);
        setPost(existingPost => ({...existingPost, [fieldName]: fieldValue}));
    }

    function submitHandler(event) {
        event.preventDefault();
        setPosts((existingPosts: PostData[]) => {
            const newPosts = existingPosts.concat(post);
            log.info("submitting post:", post, "newPosts:", newPosts);
            return newPosts;
        });
        setPost(null);
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Post <IconButton
                    aria-label="close"
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    })}
                    onClick={handleClose}>
                    <CloseIcon/>
                </IconButton>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText mb={2}>Enter post information below</DialogContentText>
                    <TextField
                        size={"small"}
                        inputProps={{readOnly: true}}
                        autoFocus
                        required
                        margin="dense"
                        label="Created On"
                        value={post?.creationDate}
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        size={"small"}
                        InputLabelProps={{shrink: true}}
                        autoFocus
                        required
                        value={post?.author}
                        margin="dense"
                        id="author"
                        label="Author"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={postChangeHandler}
                    />
                    <TextField
                        size={"small"}
                        InputLabelProps={{shrink: true}}
                        autoFocus
                        required
                        margin="dense"
                        id="body"
                        value={post?.body}
                        label="Body"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={postChangeHandler}
                    />
                    <FormControlLabel control={<Checkbox checked={post?.deletable} id={"deletable"} onChange={handleCheckboxChange}/>} label="Deletable"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={submitHandler} disabled={disabled} type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
