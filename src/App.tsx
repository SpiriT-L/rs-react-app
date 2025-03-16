import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HookForm from './components/HookForm/HookForm';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
        <Route path="/hook-form" element={<HookForm />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
