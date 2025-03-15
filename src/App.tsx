import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';
import Home from './pages/Home/Home';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      </Routes>
    </Router>
  );
};

export default App;
