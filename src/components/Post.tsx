import React from 'react';
import { PostData } from "../interfaces";
import { Button, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import CopyIcon from '@mui/icons-material/CopyAll';
import { useAtom, useSetAtom } from "jotai";
import { editablePostAtom, postsAtom } from "../atoms/atoms";

export default function Post(props: { post: PostData }) {

    const [posts, setPosts] = useAtom(postsAtom);
    const setPost = useSetAtom(editablePostAtom);

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
                        First Name: {props.post.firstName}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                        Last Name: {props.post.lastName}
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
                        <Button startIcon={<CreateIcon/>} variant="contained" color="secondary"
                        onClick={editExistingPost => {
                            setPost(props.post)
                            }}>
                        Edit
                        </Button>
                        <Button startIcon={<CopyIcon/>} variant="contained" color="secondary"
                                onClick={editExistingPost => {
                                    //  This is the long-form way of doing it, where every field in the post object is set one by one
                                    //  This is the easiest to understand way of doing it
                                    setPost({
                                        creationDate: new Date().toISOString(),
                                        deletable: props.post.deletable,
                                        firstName: props.post.firstName,
                                        lastName: props.post.lastName,
                                        body: props.post.body
                                    });
                                }}>
                            Copy (1)
                        </Button>
                        <Button startIcon={<CopyIcon/>} variant="contained" color="secondary"
                                onClick={editExistingPost => {
                                    //  This is the short-form way of doing it, where:
                                    //  a) the spread operator is used to take everything from the existing post ...props.post,
                                    //  b) just the creationDate is specified with a value as that's the only field that should be different from the existing post
                                    setPost({
                                        ...props.post,
                                        creationDate: new Date().toISOString()
                                    });
                                }}>
                            Copy (2)
                        </Button>
                        {/*Copy (2) is better than Copy (1) as it automatically caters for all fields in the post*/}
                        {/*without you needing to type them in.*/}
                        {/*But it is slightly hard to understand unless you've done some googling on the spread*/}
                        {/*operator: https://www.w3schools.com/react/react_es6_spread.asp*/}
                    </Stack>
                </CardContent>
            </Card>
        </Grid>
    );
}

