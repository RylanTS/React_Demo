import React from 'react';
import {PostData} from "../interfaces";
import {Button, Card, CardContent, Grid, Typography, Stack} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import {useAtom} from "jotai";
import {postsAtom} from "../atoms/atoms";
import {editablePostAtom} from "../atoms/atoms";

export default function Post(props: { post: PostData }) {

    const [posts, setPosts] = useAtom(postsAtom);
    const [post, setPost] = useAtom<PostData>(editablePostAtom);

    function createNewPost() {
            const newPost: PostData = {deletable: false, creationDate: new Date().toISOString(), author: '', body: ''};
            setPost(newPost);
            log.info("Create Post:", newPost);
        }

    function formatDate(creationDate: string) {
        const date = new Date(creationDate);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }


    return (
        <Grid item xs p={3}>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        Author: {props.post.author}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        Body: {props.post.body}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        Created: {formatDate(props.post.creationDate)}
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                    {props.post.deletable ?
                        <Button startIcon={<ClearIcon/>} variant="contained" color="primary"
                                onClick={() => {
                                    const updatedPosts = posts.filter(post => post.creationDate !== props.post.creationDate);
                                    setPosts(updatedPosts);
                                }}>
                            Delete
                        </Button> : null}
                        <Button startIcon={<CreateIcon/>} variant="contained" color="secondary" onClick={createNewPost}>
                        Edit
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
}

