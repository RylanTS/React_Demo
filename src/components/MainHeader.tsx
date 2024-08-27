import * as React from 'react'
import { AppBar, Box, Button, createTheme, IconButton, Stack, Toolbar, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import log from '../logging/logger';
import { useSetAtom } from "jotai/index";
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtom } from "jotai";
import { pluraliseWithCount } from "../strings";


const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  });




export function MainHeader() {

      const setPost = useSetAtom(editablePostAtom);
      const [posts, setPosts] = useAtom(postsAtom);

      function createNewPost() {
          const newPost: PostData = {author: '', body: ''};
          setPost(newPost);
          log.info("Create Post:", newPost);
      }

      function clearPosts() {
          log.info("Clearing Posts");
          setPosts([]);
      }


function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="secondary"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <ChatIcon/>
                    </IconButton>
                    <Typography variant="h3" align="center" color="secondary" component="div" sx={{flexGrow: 1}}>
                        React Poster DEMO
                    </Typography>
                    <Stack spacing={1} direction={"row"}>
                        {posts.length > 0 ?
                            <Button startIcon={<ClearIcon/>} variant="contained" color="primary" onClick={clearPosts}>
                                Clear {pluraliseWithCount(posts.length,"Post")}
                            </Button> : null}
                        <React.Fragment>
                              <Button variant="outlined" onClick={handleClickOpen}>
                                Open form dialog
                              </Button>
                              <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  component: 'form',
                                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries((formData as any).entries());
                                    const email = formJson.email;
                                    console.log(email);
                                    handleClose();
                                  },
                                }}
                              >
                                <DialogTitle>New Post</DialogTitle>
                                <DialogContent>
                                  <DialogContentText>
                        Add New Post
                                  </DialogContentText>
                                  <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    label="Author"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                  />
                                   <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    label="Body"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                  />
                                </DialogContent>
                                <DialogActions>
                                  <Button onClick={handleClose}>Cancel</Button>
                                  <Button type="submit">Confirm</Button>
                                </DialogActions>
                              </Dialog>
                            </React.Fragment>
                          );
                        }
                    </Stack>
                </Toolbar>
            </AppBar>
        </Box>
    );
}


// Original //
//                        <Button startIcon={<CreateIcon/>} variant="contained" color="secondary" onClick={createNewPost}>
//                             New Post
//                        </Button>


// New //
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
//
// export default function FormDialog() {
//   const [open, setOpen] = React.useState(false);
//
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
//
//   const handleClose = () => {
//     setOpen(false);
//   };
//
//   return (
//     <React.Fragment>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Open form dialog
//       </Button>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         PaperProps={{
//           component: 'form',
//           onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
//             event.preventDefault();
//             const formData = new FormData(event.currentTarget);
//             const formJson = Object.fromEntries((formData as any).entries());
//             const email = formJson.email;
//             console.log(email);
//             handleClose();
//           },
//         }}
//       >
//         <DialogTitle>New Post</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
// Add New Post
//           </DialogContentText>
//           <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             label="Author"
//             type="text"
//             fullWidth
//             variant="standard"
//           />
//            <TextField
//             autoFocus
//             required
//             margin="dense"
//             id="name"
//             label="Body"
//             type="text"
//             fullWidth
//             variant="standard"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button type="submit">Confirm</Button>
//         </DialogActions>
//       </Dialog>
//     </React.Fragment>
//   );
// }