import './App.css';
import { useState } from 'react';
import PostList from './Components/PostList';
import MainHeader from './Components/MainHeader';

export default function App() {

  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
 
  function showModalHandler() {
    setModalIsVisible(true);
  }

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  return (
    <>
      <MainHeader onCreatePost={showModalHandler}/>
      <main>
        <PostList isPosting={modalIsVisible} onStopPosting={hideModalHandler}/>
      </main>
    </>
  )
}
