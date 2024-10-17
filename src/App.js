import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){

    return (
      <Router>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </Router>
    )
}
export default App;
