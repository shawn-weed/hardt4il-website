import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Media from './pages/Media';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import Footer from './components/Footer';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost'
import PrivateRoute from './components/PrivateRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import AboutMe from './pages/AboutMe';
import Privacy from './pages/Privacy';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/about-me' element={<AboutMe />} />
        <Route element ={<PrivateRoute />}> 
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element ={<AdminPrivateRoute />}> 
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
        </Route>
        <Route path='/media' element={<Media />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/search' element={<Search />} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        <Route path='/privacy' element={<Privacy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
