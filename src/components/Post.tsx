import React from 'react';
import {PostData} from "../interfaces";
import {Button, Card, CardContent, Grid, Typography} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import {useAtom} from "jotai";
import {postsAtom} from "../atoms/atoms";

export default function Post(props: { post: PostData }) {

    const [posts, setPosts] = useAtom(postsAtom);

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
                    {props.post.deletable ?
                        <Button startIcon={<ClearIcon/>} variant="contained" color="primary"
                                onClick={() => {
                                    const updatedPosts = posts.filter(post => post.creationDate !== props.post.creationDate);
                                    setPosts(updatedPosts);
                                }}>
                            Delete
                        </Button> : null}
                </CardContent>
            </Card>
        </Grid>
    );
}

