import { useState } from 'react';
import Post from './Post';
import Modal from './Modal';
import NewPost from './NewPost';
import { PostData } from "../interfaces";

function PostList({isPosting, onStopPosting}) {
    const [posts, setPosts] = useState<PostData[]>([]);

    function addPostHandler(postData: PostData): void {
        setPosts((existingPosts: PostData[]) => [postData, ...existingPosts]);
    }

    return (
        <>
            {isPosting ?
                <>
                    <Modal onClose={onStopPosting}>
                        <NewPost onCancel={onStopPosting} onAddPost={addPostHandler}/>
                    </Modal>
                </> : null}
            {posts.length > 0 && (<ul className={"posts"}>
                    {posts.map((post) => <Post key={post.body} author={post.author} body={post.body} />)}
                </ul>
            )}
            {posts?.length === 0 ?
            <div style={{textAlign: 'center', color: 'white'}}>
            <h2>There are no posts yet.</h2>
            <p>Start adding some!</p>
            </div> : null}
        </>
    );
}

export default PostList;
