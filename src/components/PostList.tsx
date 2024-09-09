import React from 'react';
import { PostData } from "../interfaces";
import { postsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
import Post from "./Post";
import { Box, Grid, Alert, AlertTitle, Stack } from '@mui/material';

export default function PostList() {

    const posts: PostData[] = useAtomValue<PostData[]>(postsAtom);

    return posts.length > 0 ?
        <Box>
            <Grid container spacing={1}>
            <Stack direction="row" spacing={2}>
                {posts.map((post: PostData, index) => <Post key={index + post.author + post.body} post={post}/>)}
            </Stack>
            </Grid>
        </Box> :
        <>
            <Alert color="secondary" variant="filled" severity="info">
            <AlertTitle>There are no posts yet.</AlertTitle>
                Start adding some!
            </Alert>
        </>;
}



//             <div style={{textAlign: 'center', color: 'white'}}>
//                 <h2>There are no posts yet.</h2>
//                 <p>Start adding some!</p>
//             </div>