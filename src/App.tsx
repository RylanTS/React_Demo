import './App.css';
import PostList from './xComponents/PostList';
import { MainHeader } from "./xComponents/MainHeader";

export default function App() {

  return (
    <>
      <MainHeader/>
      <main>
        <PostList/>
      </main>
    </>
  )
}
