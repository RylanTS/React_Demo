import * as React from 'react';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    IconButton,
    TextField,
    Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreateIcon from '@mui/icons-material/Create';
import log from '../logging/logger';
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtom } from "jotai";


export default function PostEntry() {

    const [posts, setPosts] = useAtom(postsAtom);
    const [post, setPost] = useAtom<PostData>(editablePostAtom);
    const disabled = !post?.body || !post?.firstName || !post?.lastName;
    const open = !!post;
    const addNew: boolean = !posts.find(existingPost => existingPost.creationDate === post?.creationDate);
    const editMode = addNew ? "Add New" : "Edit Existing";

    

    function submitHandler(event) {
        event.preventDefault();
        setPosts((existingPosts: PostData[]) => {
            const newPosts: PostData[] = existingPosts
            .filter(existingPost => existingPost.creationDate !== post.creationDate)
            .concat(post)
            .sort((a: PostData, b: PostData) =>{
                const firstDate = Date.parse(a.creationDate)
                const secondDate = Date.parse(b.creationDate)
                log.debug("firstDate", firstDate, "secondDate", secondDate)
                return secondDate - firstDate });
            log.debug("submitting post:", post, "existing posts:", existingPosts, "newPosts:", newPosts,);
            return newPosts;
        });
        setPost(null);
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

    return (        
        <Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editMode} Post <IconButton
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
                        value={post?.creationDate || ""}
                        type="text"
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        size={"small"}
                        InputLabelProps={{shrink: true}}
                        autoFocus
                        required
                        value={post?.firstName || ""}
                        margin="dense"
                        id="firstName"
                        label="First Name"
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
                        value={post?.lastName || ""}
                        margin="dense"
                        id="lastName"
                        label="Last Name"
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
                        value={post?.body || ""}
                        label="Body"
                        type="text"
                        fullWidth
                        variant="outlined"
                        onChange={postChangeHandler}
                    />
                    <FormControlLabel control={<Checkbox checked={post?.deletable || false} id={"deletable"}
                                                         onChange={handleCheckboxChange}/>} label="Deletable"/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={submitHandler} disabled={disabled} type="submit">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
};           