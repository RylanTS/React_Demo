import './App.css';
import { MainHeader } from "./components/MainHeader";
import PostList from "./components/PostList";

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
