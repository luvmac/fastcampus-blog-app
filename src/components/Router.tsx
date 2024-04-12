import { Route, Routes, Navigate, Link } from 'react-router-dom'
import Home from '../pages/home'
import PostList from '../pages/posts'
import PostDetail from '../pages/posts/detail'
import PostNew from '../pages/posts/new'
import PostEdit from '../pages/posts/edit'
import ProfilePage from '../pages/profile'
import LoginPage from '../pages/login'
import SignupPage from '../pages/signup'
export default function Router() {
  return (
    <>      
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/posts" element={<PostList />}></Route>
      <Route path="/posts/:id" element={<PostDetail />}></Route>
      <Route path="/posts/new" element={<PostNew />}></Route>
      <Route path="/posts/edit/:id" element={<PostEdit />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to="/" />}></Route>
    </Routes>
    </>
  )
}

