import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginPage from './pages/LoginPage';
import ProfilePage from './routes/profile/profilePage';
import HomePage from './routes/homePage/HomePage';
import AboutPage from './routes/about/AboutPage'
import ContactPage from './routes/contact/ContactPage';


function App() {
  return (
    <>
   
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/me" element={<ProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    </>
  );
}

export default App;
