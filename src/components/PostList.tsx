import React from 'react';
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
import Post from "./Post";
import {
    Box,
    Paper,
    Grid,
    Grid2,
    styled,
    experimentalStyled
} from '@mui/material'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function PostList() {

    const posts: PostData[] = useAtomValue<PostData[]>(postsAtom);

    return (
        <Box>
            {posts.length > 0 ? <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
            <Grid size={6}>
                <Item>
                {posts.map((post: PostData, index) => <Post key={index + post.author + post.body} post={post}/>)}
                </Item>
            </Grid>
            </Grid> : null}
            {posts?.length === 0 ?
            <div style={{textAlign: 'center', color: 'white'}}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
            </div> : null}
        </Box>
    );
}

// export default function RowAndColumnSpacing() {
//   return (
//     <Box sx={{ width: '100%' }}>
//       <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//         <Grid size={6}>
//           <Item>Post Test</Item>
//         </Grid>
//         <Grid size={6}>
//           <Item>Post Test</Item>
//         </Grid>
//         <Grid size={6}>
//           <Item>Post Test</Item>
//         </Grid>
//         <Grid size={6}>
//           <Item>Post Test</Item>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

