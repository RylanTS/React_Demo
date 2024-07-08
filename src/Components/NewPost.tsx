import { useState } from 'react';
import { PostData } from "../interfaces";

function NewPost(props: { onCancel: () => void, onAddPost: (data: PostData) => void }) {
  
  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function bodyChangeHandler(event) {
      setEnteredBody(event.target.value)
  }

  function authorChangeHandler(event) {
      setEnteredAuthor(event.target.value)
  }

  function submitHandler(event) {
      event.preventDefault();
      const postData: PostData = {
        body: enteredBody,
        author: enteredAuthor
      };
      props.onAddPost(postData);
      props.onCancel();
  }

  return (
      <form className={"form"} onSubmit={submitHandler}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={bodyChangeHandler} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={authorChangeHandler} />
      </p>
          <p className={"actions"}>
              <button type="button" onClick={props.onCancel}>Cancel</button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
