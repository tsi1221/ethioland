import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './routes/homePage/HomePage';
import AboutPage from './routes/about/AboutPage';
import ContactPage from './routes/contact/ContactPage';
import ProfilePage from './routes/profile/profilePage';
import RegisterForm from './components/RegisterForm';
import ListPage from './routes/listPage/listpage';
import LoginPage from './routes/login/LoginPage'
import UpdateProfile from './routes/UpdateProfile/UpdateProfile';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/me" element={<ProfilePage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/update-profile" element={<UpdateProfile/>} />
      </Routes>
    </>
  );
};

export default App;
