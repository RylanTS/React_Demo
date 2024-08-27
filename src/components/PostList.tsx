import React from 'react';
// import Modal from './Modal';
import NewPost from './NewPost';
import { PostData } from "../interfaces";
import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useAtomValue } from "jotai";
// import Post from "./Post";

export default function PostList() {

    const posts: PostData[] = useAtomValue<PostData[]>(postsAtom);
    const post: PostData = useAtomValue<PostData>(editablePostAtom);

    return (
        <>
            {post ?
                <Modal>
                    <NewPost/>
                </Modal> : null}
            {posts.length > 0 ? <ul className={"posts"}>
                {posts.map((post: PostData, index) => <Post key={index + post.author + post.body} post={post}/>)}
            </ul> : null}
            {posts?.length === 0 ?
            <div style={{textAlign: 'center', color: 'white'}}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
            </div> : null}
        </>
    );
}
