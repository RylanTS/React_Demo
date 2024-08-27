import React from 'react';
import { PostData } from "../interfaces";

export default function Post(props: { post: PostData }) {
    return (
    <li className={"post"}>
        <p className={"author"}>{props.post.author}</p>
        <p className={"text"}>{props.post.body}</p>
    </li>);
}
