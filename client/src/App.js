import logo from './logo.svg';
import './App.css';
import Home from './Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from './components/profile/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/profile' element={<UserProfile/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
