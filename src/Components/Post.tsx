
function Post(props) {
    return (
    <li className={"post"}>
        <p className={"author"}>{props.author}</p>
        <p className={"text"}>{props.body}</p>
    </li>
    );
}


export default Post;
