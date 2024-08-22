import './App.css';
import PostList from './components/PostList';
import { MainHeader } from "./components/MainHeader";

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
