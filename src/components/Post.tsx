import React from 'react';
import { PostData } from "../interfaces";
import { Card, CardContent, Grid, Typography, Button, IconButton, Stack } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import ClearIcon from '@mui/icons-material/Clear';
import MainHeader from "./MainHeader"
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { pluraliseWithCount } from "../strings";

export default function Post(props: { post: PostData }) {

const currentDate = new Date();

const currentDayOfMonth = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const dateString = currentDayOfMonth + "-" + (currentMonth + 1) + "-" + currentYear;

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
                    <Typography>
                        {dateString}
                    </Typography>
                    <Button startIcon={<ClearIcon/>} variant="contained" color="primary"
                    onClick={PostData = PostData.filter(PostData => PostData !== posts)} >
                        Delete
                    </Button>
                </CardContent>
            </Card>
        </Grid>);
}
