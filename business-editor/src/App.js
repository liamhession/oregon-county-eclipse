import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Login from './Login';
import EditBusiness from './EditBusiness';

// import { supabase } from './supabase';

function App() {
  // const { user } = supabase.auth.user();
  // TODO: restrict access to /edit to logged in users

  return (
    <Router>
      <Routes>
        <Route path='/edit' element={<EditBusiness />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h2>Welcome to the business editor</h2>;
}

export default App;
