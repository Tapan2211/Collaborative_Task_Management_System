import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/tasks/:projectId" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />

    </>
  );
}

export default App;




// import logo from './logo.svg';
// import './App.css';
// import { Routes, Route } from 'react-router-dom';

// import LoginPage from './pages/LoginPage'
// import RegisterPage from './pages/RegisterPage';
// import HomePage from './pages/HomePage';

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
