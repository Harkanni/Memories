import React from 'react';
import { Container } from '@material-ui/core';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('Profile'));
  return (
    <BrowserRouter>
      <Container maxidth='xl'>
        <Navbar />
        <Routes>
          <Route path='/' exact Component={() => <Navigate to="/posts"/>} />
          <Route path='/posts' Component={Home} />
          <Route path='/posts/search' Component={Home} />
          <Route path='/posts/:id' Component={PostDetails} />
          <Route path='/auth' Component={() => (!user ? <Auth /> : <Navigate to='/posts'></Navigate>)} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
