import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={< Login/>} />
         <Route path="/dashboard" element={< Dashboard/>} />
      </Routes>
    </Router>
  );
}

export default App;