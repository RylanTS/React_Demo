import {useState} from 'react'
import PostList from './Components/PostList.jsx'
import MainHeader from './Components/MainHeader.jsx';

function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
 
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



export default App;
