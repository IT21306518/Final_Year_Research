import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import OpenPage from './navigations/Open.page';
import SignUpPage from './navigations/forms/SIgnUp';
import SignInPage from './navigations/forms/SignIn';
import Dashboard from './navigations/dashboard/Dashboard';
import GoldPrediction from './navigations/dashboard/GoldPrediction';

function App() {
  const [redirectRoute, setRedirectRoute] = useState('/welcome');

  useEffect(() => {
    const changeRoute = () => {
      console.log("check")
      if (localStorage.getItem('username')) {
        if (localStorage.getItem('passed') === "Passed") {
          setRedirectRoute('/dashboard');
          // history('/dashboard')
        } else {
          setRedirectRoute('/welcome');
          // history('/quest-begin')
        }
      }
    };
    changeRoute();
  }, []);

  return (
    <div className="App">
      <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to={redirectRoute} replace />} />
          <Route path="/welcome" element={<OpenPage />} />
          <Route path="/forms/sign-up" element={<SignUpPage />} />
          <Route path="/forms/sign-in" element={<SignInPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gold-prediction" element={<GoldPrediction />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
