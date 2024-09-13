import React from 'react';
import { PostData } from "../interfaces";
import { postsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
import Post from "./Post";
import { Alert, AlertTitle, Box, Grid, Stack, } from '@mui/material';

export default function PostList() {

    const posts: PostData[] = useAtomValue<PostData[]>(postsAtom);

    return posts.length > 0 ?
        <Box>
            <Grid container spacing={1}>
            <Stack direction="row" spacing={2}>
                {posts.map((post: PostData, index) => <Post key={index + post.firstName + post.lastName + post.body} post={post}/>)}
            </Stack>
            </Grid>
        </Box> :
        <Alert color={"info"} variant={"filled"} severity={"info"}>
            <AlertTitle>There are no posts yet.</AlertTitle>
                Start adding some!
        </Alert>;
}
