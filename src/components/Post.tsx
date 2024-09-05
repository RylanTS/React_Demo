import React from 'react';
import { PostData } from "../interfaces";
import { Card, CardContent, Grid, Typography } from "@mui/material";

export default function Post(props: { post: PostData }) {
    return (
        <Grid item xs m={1}>
            <Card>
                <CardContent>
                    <Typography className={"author"} gutterBottom variant="h5" component="div">
                        {props.post.author}
                    </Typography>
                    <Typography className={"text"} gutterBottom variant="h5" component="div">
                        {props.post.body}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>);
}
