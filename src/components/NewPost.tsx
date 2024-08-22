import { editablePostAtom, postsAtom } from "../atoms/atoms";
import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai/index";
import { PostData } from "../interfaces";
import log from '../logging/logger';

export default function NewPost() {

    const setPosts = useSetAtom(postsAtom);
    const [post, setPost] = useAtom<PostData>(editablePostAtom);

    useEffect(() => {
        log.info("creating new post");
    }, []);

    function postChangeHandler(event) {
        const fieldName = event.target.id;
        const fieldValue = event.target.value;
        log.info("changing post fieldName:", fieldName, "fieldValue:", fieldValue);
        setPost(existingPost => ({...existingPost, [fieldName]: fieldValue}));
    }

    function submitHandler(event) {
        event.preventDefault();
        setPosts((existingPosts: PostData[]) => {
            const newPosts = existingPosts.concat(post);
            log.info("submitting post:", post, "newPosts:", newPosts);
            return newPosts;
        });
        setPost(null);
    }

    function cancel() {
        setPost(null);
    }

    return (
        <form className={"form"} onSubmit={submitHandler}>
            <p>
                <label htmlFor="body">Text</label>
                <textarea autoFocus id="body" required rows={3} value={post.body} onChange={postChangeHandler}/>
            </p>
            <p>
                <label htmlFor="name">Your name</label>
                <input type="text" id="author" value={post.author} required onChange={postChangeHandler}/>
            </p>
            <p className={"actions"}>
                <button type="button" onClick={cancel}>Cancel</button>
                <button>Submit</button>
            </p>
        </form>
    );
}
