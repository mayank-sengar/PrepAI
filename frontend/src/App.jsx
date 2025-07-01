import React from 'react'
import {BrowserRouter as Router,Routes,Route} from  "react-router-dom"
import Login from "./pages/Auth/Login.jsx"
import SignUp from "./pages/Auth/SignUp.jsx"
import Dashboard from './pages/Home/Dashboard.jsx';
import InterviewPrep from './pages/InterviewPrep/InterviewPrep.jsx';
import LandingPage from './pages/InterviewPrep/LandingPage.jsx';
import {Toaster} from  "react-hot-toast"

function App() {
  return (
    <>
    <Router>
      <Routes>

        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
         <Route path="/signup" element={<SignUp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
           <Route path="/interview-prep:sessionId" element={<InterviewPrep/>} />
      </Routes>
    </Router>

<Toaster
  toastOptions={{
    style: { fontSize: "13px" },
    success: { icon: '✅' },
    error: { icon: '❌' },
  }}
/>



</>
    
  )
}

export default App