import React from 'react';
import { PostData } from "../interfaces";
import { postsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
import Post from "./Post";
import { Box, Grid } from '@mui/material';

export default function PostList() {

    const posts: PostData[] = useAtomValue<PostData[]>(postsAtom);

    return posts.length > 0 ?
        <Box>
            <Grid container spacing={1}>
                {posts.map((post: PostData, index) => <Post key={index + post.author + post.body} post={post}/>)}
            </Grid>
        </Box> :
        <>
            <div style={{textAlign: 'center', color: 'white'}}>
                <h2>There are no posts yet.</h2>
                <p>Start adding some!</p>
            </div>
        </>;
}
